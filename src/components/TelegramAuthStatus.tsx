import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { signInWithTelegram } from "@/lib/auth-telegram";
import { supabase } from "@/lib/supabase";
import { getInitData } from "@/lib/telegram";

/**
 * Показывает статус входа через Telegram и текст ошибки (для отладки Mini App).
 */
export function TelegramAuthStatus() {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string | null>(null);
  const [debugLine, setDebugLine] = useState<string>("");

  const refresh = useCallback(async () => {
    if (!supabase) {
      setEmail(null);
      setDebugLine(t("authDebug.noSupabase"));
      return;
    }
    const { data } = await supabase.auth.getSession();
    setEmail(data.session?.user?.email ?? null);

    const raw = sessionStorage.getItem("tg_auth_debug");
    const res = sessionStorage.getItem("tg_auth_result");
    let extra = "";
    if (raw) {
      try {
        const j = JSON.parse(raw) as { hasInitData?: boolean };
        if (j.hasInitData === false) {
          extra = t("authDebug.noInitData");
        }
      } catch {
        /* ignore */
      }
    }
    if (res) {
      try {
        const r = JSON.parse(res) as { ok?: boolean; error?: string; detail?: string };
        if (r.ok === false) {
          extra = [extra, r.error, r.detail].filter(Boolean).join(" — ");
        }
      } catch {
        /* ignore */
      }
    }
    setDebugLine(extra);
  }, [t]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const retry = () => {
    const initData = getInitData();
    if (!initData || !supabase) return;
    void signInWithTelegram(initData).then((r) => {
      sessionStorage.setItem("tg_auth_result", JSON.stringify(r));
      if (r.ok) {
        sessionStorage.setItem("tg_user", JSON.stringify(r.telegramUser));
      }
      void refresh();
    });
  };

  return (
    <div className="mb-6 rounded-xl border border-outline-variant/40 bg-surface-container-low p-4 text-left text-sm">
      <p className="mb-2 font-headline font-bold text-primary">{t("authDebug.title")}</p>
      {email ? (
        <p className="text-on-surface">
          <span className="text-on-surface-variant">{t("authDebug.session")}</span> {email}
        </p>
      ) : (
        <p className="text-error">{t("authDebug.noSession")}</p>
      )}
      {debugLine ? (
        <p className="mt-2 break-words text-xs text-on-surface-variant">{debugLine}</p>
      ) : null}
      <p className="mt-3 text-xs leading-relaxed text-on-surface-variant">{t("authDebug.jwtHint")}</p>
      <button
        type="button"
        onClick={retry}
        className="mt-3 w-full rounded-lg bg-primary/10 py-2 text-sm font-semibold text-primary active:scale-[0.99]"
      >
        {t("authDebug.retry")}
      </button>
    </div>
  );
}
