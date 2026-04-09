import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type Session } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { createHmac, timingSafeEqual } from "node:crypto";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function validateInitData(initData: string, botToken: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return false;
  params.delete("hash");
  /** Не участвует в HMAC для `hash` (см. Web Apps: third-party проверка по `signature` — те же поля, что и для hash). */
  params.delete("signature");

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

/** Детерминированный пароль только на сервере (зависит от BOT_TOKEN). */
function authPasswordForTelegram(telegramId: number, botToken: string): string {
  return createHmac("sha256", botToken).update(`auth:${telegramId}`).digest("hex");
}

/** Локальная часть — только цифры; домен с валидным gTLD (валидаторы Auth не режут). */
function emailForTelegram(telegramId: number): string {
  return `${telegramId}@telegram-auth.app`;
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
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim();
  const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim();

  if (!botToken || !supabaseUrl || !serviceRole) {
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
    console.error("[telegram-auth] invalid_hash");
    return new Response(JSON.stringify({ ok: false, error: "invalid_hash" }), {
      status: 401,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const tgUser = parseUser(initData);
  if (!tgUser || tgUser.id === undefined || tgUser.id === null) {
    return new Response(JSON.stringify({ ok: false, error: "no_user_in_init_data" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const rawId = tgUser.id;
  const telegramId =
    typeof rawId === "number" && Number.isFinite(rawId)
      ? rawId
      : parseInt(String(rawId).trim(), 10);
  if (!Number.isFinite(telegramId) || telegramId <= 0) {
    return new Response(JSON.stringify({ ok: false, error: "bad_telegram_id" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const email = emailForTelegram(telegramId);
  const password = authPasswordForTelegram(telegramId, botToken);

  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim();
  if (!anonKey) {
    return new Response(JSON.stringify({ ok: false, error: "server_misconfigured", detail: "no_anon_key" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  /** Вход по паролю делаем через anon client — так Supabase Auth возвращает обычную user-сессию. */
  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const admin = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let session: Session | null = null;

  const trySignIn = await authClient.auth.signInWithPassword({ email, password });
  if (trySignIn.data.session) {
    session = trySignIn.data.session;
  } else {
    const createRes = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        telegram_id: telegramId,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
      },
    });

    if (createRes.error) {
      const msg = createRes.error.message ?? "";
      console.error("[telegram-auth] createUser:", msg);
      const duplicate = /already|registered|exists/i.test(msg);
      if (duplicate) {
        const list = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
        const existing = list.data?.users?.find((u) => u.email === email);
        if (existing?.id) {
          await admin.auth.admin.updateUserById(existing.id, { password });
        }
      } else {
        return new Response(
          JSON.stringify({ ok: false, error: "auth_create_failed", detail: msg }),
          { status: 500, headers: { ...cors, "Content-Type": "application/json" } },
        );
      }
    }

    const retry = await authClient.auth.signInWithPassword({ email, password });
    if (retry.error || !retry.data.session) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "sign_in_failed",
          detail: retry.error?.message ?? "no_session",
        }),
        { status: 500, headers: { ...cors, "Content-Type": "application/json" } },
      );
    }
    session = retry.data.session;
  }

  const firstName = typeof tgUser.first_name === "string" ? tgUser.first_name : null;
  const lastName = typeof tgUser.last_name === "string" ? tgUser.last_name : null;
  const username = typeof tgUser.username === "string" ? tgUser.username : null;
  const photoUrl =
    typeof tgUser.photo_url === "string"
      ? tgUser.photo_url
      : typeof tgUser.photoUrl === "string"
        ? tgUser.photoUrl
        : null;
  const languageCode = typeof tgUser.language_code === "string" ? tgUser.language_code : null;

  const { error: profileErr } = await admin.from("profiles").upsert(
    {
      id: session.user.id,
      telegram_id: telegramId,
      first_name: firstName,
      last_name: lastName,
      username,
      telegram_photo_url: photoUrl,
      language_code: languageCode,
    },
    { onConflict: "id" },
  );

  if (profileErr) {
    return new Response(JSON.stringify({ ok: false, error: "profile_upsert_failed", detail: profileErr.message }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      session: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_in: session.expires_in,
        expires_at: session.expires_at,
        token_type: session.token_type,
        user: session.user,
      },
      telegram_user: tgUser,
    }),
    { status: 200, headers: { ...cors, "Content-Type": "application/json" } },
  );
});
