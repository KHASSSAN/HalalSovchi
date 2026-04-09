import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { signInWithTelegram } from "@/lib/auth-telegram";
import { getInitData, initTelegramWebApp } from "@/lib/telegram";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { DiscoverPage } from "@/pages/DiscoverPage";
import { MatchesPage } from "@/pages/MatchesPage";
import { ChatPage } from "@/pages/ChatPage";
import { RulesPage } from "@/pages/RulesPage";

export default function App() {
  useEffect(() => {
    initTelegramWebApp();

    const runAuth = (attempt: number) => {
      const initData = getInitData();
      sessionStorage.setItem(
        "tg_auth_debug",
        JSON.stringify({
          hasInitData: Boolean(initData?.length),
          attempt,
          at: new Date().toISOString(),
        }),
      );
      if (!initData) return;
      void signInWithTelegram(initData).then((r) => {
        sessionStorage.setItem("tg_auth_result", JSON.stringify(r));
        if (r.ok) {
          sessionStorage.setItem("tg_user", JSON.stringify(r.telegramUser));
        }
      });
    };

    runAuth(0);
    const t1 = window.setTimeout(() => runAuth(1), 400);
    const t2 = window.setTimeout(() => runAuth(2), 1200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route element={<AppLayout />}>
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="chat/:matchId" element={<ChatPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
