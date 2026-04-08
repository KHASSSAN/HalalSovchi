import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlWPha4vJEOtFQnqioEOdtqQP6zb9yNxuhc_2N5ZC1xZn6yzdZ3Zl2k1pQWRelesKTNhejtWd1TPHJ3HV6N_oUxRki_-J-SRXTkKKA2iDHsdmk7_-7AAeKe3neo3O6n8PKEF36gEA_GHo3uigTQ634KNg67ViwpqPVey_BI8Ym3_s_xufaEDUPxDNv8n-TyuzoebNf2FU7Gv-l3gqBi0HiZyeVReyayXD-y4XCXv-7kU3__9BelxKoa-Za4JgOLyC5dX4P6K8VWNu5";

export function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background text-on-surface">
      <div className="fixed inset-0 z-0">
        <img
          alt=""
          src={HERO_BG}
          className="h-full w-full object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
      </div>

      <main className="relative z-10 flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-between px-6 py-12">
        <div className="mt-8 w-full text-center">
          <div className="mb-6 inline-flex items-center justify-center">
            <span
              className="material-symbols-outlined mr-2 text-4xl text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              spa
            </span>
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text font-headline text-xl font-extrabold tracking-tight text-transparent">
              {t("app.name")}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center space-y-6 text-center">
          <h1 className="font-headline px-4 text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
            {t("home.heroTitle")}
          </h1>
          <p className="max-w-[280px] text-lg leading-relaxed text-on-surface-variant">
            {t("home.heroSubtitle")}
          </p>
          <div className="h-1 w-24 rounded-full bg-secondary-container opacity-60" />
        </div>

        <div className="mb-12 w-full space-y-8">
          <LanguageSwitcher />

          <div className="flex flex-col space-y-4">
            <Link
              to="/discover"
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-container py-5 text-lg font-bold text-on-primary shadow-[0_8px_24px_rgba(0,77,52,0.15)] transition-all active:scale-95"
            >
              {t("home.cta")}
              <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
            </Link>
            <p className="px-8 text-center text-xs text-on-surface-variant opacity-70">
              {t("home.consent")}
            </p>
            <Link
              to="/rules"
              className="text-center text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              {t("home.rulesLink")}
            </Link>
          </div>
        </div>
      </main>

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
        }}
      />
    </div>
  );
}
