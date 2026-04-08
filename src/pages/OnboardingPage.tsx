import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function OnboardingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background px-6 pb-12 pt-16 font-body text-on-background">
      <h1 className="font-headline text-3xl font-extrabold text-on-surface">{t("onboarding.title")}</h1>
      <p className="mt-4 text-on-surface-variant">{t("onboarding.body")}</p>
      <div className="mt-10 flex flex-col gap-3">
        <Link
          to="/discover"
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-container py-4 font-bold text-on-primary shadow-[0_8px_24px_rgba(0,77,52,0.15)]"
        >
          {t("onboarding.continue")}
        </Link>
        <Link to="/" className="text-center text-sm font-medium text-primary">
          {t("onboarding.home")}
        </Link>
      </div>
    </div>
  );
}
