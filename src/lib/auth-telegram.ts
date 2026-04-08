import { supabase } from "@/lib/supabase";

export type TelegramAuthResult =
  | { ok: true; user: Record<string, unknown> }
  | { ok: false; error: string };

/**
 * Отправляет initData на Edge Function `telegram-auth` (проверка hash на сервере).
 * Нужны VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY и задеплоенная функция с секретом TELEGRAM_BOT_TOKEN.
 */
export async function verifyTelegramInitData(initData: string): Promise<TelegramAuthResult> {
  if (!supabase) {
    return { ok: false, error: "supabase_not_configured" };
  }

  const { data, error } = await supabase.functions.invoke("telegram-auth", {
    body: { initData },
  });

  if (error) {
    return { ok: false, error: error.message ?? "invoke_failed" };
  }

  const payload = data as { ok?: boolean; user?: Record<string, unknown>; error?: string };
  if (payload?.ok === true && payload.user) {
    return { ok: true, user: payload.user };
  }

  return { ok: false, error: payload?.error ?? "unknown" };
}
