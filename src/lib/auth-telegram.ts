import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type TelegramAuthResult =
  | { ok: true; session: Session; telegramUser: Record<string, unknown> }
  | { ok: false; error: string; detail?: string };

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
    return { ok: false, error: error.message ?? "invoke_failed" };
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
