import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Browser client. Row Level Security must enforce access; never put service role here.
 * Auth: exchange Telegram initData for session via Edge Function (to be wired).
 */
export const supabase =
  url && anon
    ? createClient(url, anon, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anon);
}
