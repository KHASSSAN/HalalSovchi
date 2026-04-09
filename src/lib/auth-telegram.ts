import { FunctionsHttpError, type Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type TelegramAuthResult =
  | { ok: true; session: Session; telegramUser: Record<string, unknown> }
  | { ok: false; error: string; detail?: string };

function parseFunctionsError(error: unknown): string {
  if (!error || typeof error !== "object") return String(error);
  const e = error as { message?: string; context?: { body?: string } };
  let msg = e.message ?? "invoke_failed";
  const body = e.context?.body;
  if (body) {
    try {
      const j = JSON.parse(body) as { error?: string; detail?: string };
      if (j.error) msg = `${msg}: ${j.error}`;
      if (j.detail) msg += ` — ${j.detail}`;
    } catch {
      msg += ` — ${body.slice(0, 200)}`;
    }
  }
  return msg;
}

/** При non-2xx тело JSON не попадает в `data`, только в `error.context` (Response). */
async function parseFunctionsHttpError(
  error: FunctionsHttpError,
): Promise<{ error: string; detail?: string } | null> {
  const res = error.context as Response | undefined;
  if (!res || typeof res.clone !== "function") return null;
  const raw = res.clone();
  try {
    const body = await res.json();
    if (body && typeof body === "object") {
      const b = body as { error?: string; detail?: string; message?: string; msg?: string };
      const code = b.error ?? b.msg;
      const detail = b.detail ?? (typeof b.message === "string" ? b.message : undefined);
      if (code || detail) {
        return { error: code ?? "http_error", detail };
      }
    }
  } catch {
    try {
      const text = await raw.text();
      if (text) {
        return { error: "non_json_error", detail: text.slice(0, 400) };
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

/**
 * Проверка initData и получение сессии Supabase (Edge Function `telegram-auth`).
 */
export async function signInWithTelegram(initData: string): Promise<TelegramAuthResult> {
  if (!supabase) {
    return { ok: false, error: "supabase_not_configured" };
  }

  const { data, error } = await supabase.functions.invoke("telegram-auth", {
    body: { initData },
  });

  if (error) {
    if (error instanceof FunctionsHttpError) {
      const parsed = await parseFunctionsHttpError(error);
      if (parsed) {
        return { ok: false, error: parsed.error, detail: parsed.detail };
      }
    }
    return { ok: false, error: parseFunctionsError(error) };
  }

  const payload = data as {
    ok?: boolean;
    session?: {
      access_token: string;
      refresh_token: string;
      expires_in?: number;
      expires_at?: number;
      token_type: string;
      user: Session["user"];
    };
    telegram_user?: Record<string, unknown>;
    error?: string;
    detail?: string;
  };

  if (!payload?.ok || !payload.session) {
    return {
      ok: false,
      error: payload?.error ?? "unknown",
      detail: payload?.detail,
    };
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: payload.session.access_token,
    refresh_token: payload.session.refresh_token,
  });

  if (sessionError) {
    return { ok: false, error: sessionError.message };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    return { ok: false, error: "no_session_after_set" };
  }

  return {
    ok: true,
    session: sessionData.session,
    telegramUser: payload.telegram_user ?? {},
  };
}
