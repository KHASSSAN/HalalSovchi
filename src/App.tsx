import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { verifyTelegramInitData } from "@/lib/auth-telegram";
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
    const initData = getInitData();
    if (!initData) return;
    void verifyTelegramInitData(initData).then((r) => {
      if (r.ok) {
        sessionStorage.setItem("tg_user", JSON.stringify(r.user));
      }
    });
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
