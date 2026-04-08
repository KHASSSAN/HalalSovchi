import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createHmac, timingSafeEqual } from "node:crypto";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/** Проверка initData по https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app */
function validateInitData(initData: string, botToken: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return false;
  params.delete("hash");

  const pairs = [...params.entries()].sort(([a], [b]) => a.localeCompare(b));
  const dataCheckString = pairs.map(([k, v]) => `${k}=${v}`).join("\n");

  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculated = createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  try {
    const a = Buffer.from(calculated, "hex");
    const b = Buffer.from(hash, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function parseUser(initData: string): Record<string, unknown> | null {
  const userStr = new URLSearchParams(initData).get("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as Record<string, unknown>;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN")?.trim();
  if (!botToken) {
    return new Response(JSON.stringify({ ok: false, error: "server_misconfigured" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  let body: { initData?: string };
  try {
    body = (await req.json()) as { initData?: string };
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const initData = body.initData?.trim();
  if (!initData) {
    return new Response(JSON.stringify({ ok: false, error: "missing_init_data" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const authDateRaw = new URLSearchParams(initData).get("auth_date");
  const authDate = authDateRaw ? parseInt(authDateRaw, 10) : 0;
  const now = Math.floor(Date.now() / 1000);
  if (!authDate || now - authDate > 86400) {
    return new Response(JSON.stringify({ ok: false, error: "auth_date_expired" }), {
      status: 401,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  if (!validateInitData(initData, botToken)) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_hash" }), {
      status: 401,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const user = parseUser(initData);
  if (!user) {
    return new Response(JSON.stringify({ ok: false, error: "no_user_in_init_data" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, user }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
