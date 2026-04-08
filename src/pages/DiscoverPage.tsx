import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CARD_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBLa5BDurvYQAkq7mCnlrSqATLsmZbkKMbWbZmzdO-DuZvBiH7ovq_gShQmAtQsrU8D9f98HU8jLrgSpVsf5dLM0EMRkBpUV3kvHDndJmBXjL6rt27zgcEZFjlVhveF7n8DkgG9lJygqsM3yBWEq9q_NTAKgtC5CiTdVq-Ui1CwkE3RjoiqScQpspQsuGuIqstrWqvmh4gdMLBPSCW8DhDhKTvLRkKGxqHxCI6UwkIBHCy495n0wmtcnGgtJttzkH6yDZMlDVVSwm8_";

export function DiscoverPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[100dvh] bg-background font-body text-on-background">
      <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-surface/80 px-6 py-4 backdrop-blur-md">
        <h1 className="font-headline text-xl font-bold text-primary">{t("discover.title")}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container active:scale-95"
            aria-label={t("discover.filterAria")}
          >
            <span className="material-symbols-outlined text-on-surface-variant">tune</span>
          </button>
        </div>
      </header>

      <div className="px-6 pb-8 pt-4">
        <div className="relative overflow-hidden rounded-3xl shadow-[0_12px_40px_rgba(0,77,52,0.12)]">
          <img alt="" src={CARD_IMG} className="aspect-[3/4] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="font-headline text-2xl font-bold">{t("discover.demoCardTitle")}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/90">
              <span className="material-symbols-outlined text-base">location_on</span>
              {t("discover.demoCity")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-outline-variant bg-surface-container-lowest shadow-md transition-transform active:scale-95"
            aria-label={t("discover.skipAria")}
          >
            <span className="material-symbols-outlined text-3xl text-error">close</span>
          </button>
          <button
            type="button"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container shadow-lg transition-transform active:scale-95"
            aria-label={t("discover.likeAria")}
          >
            <span className="material-symbols-outlined text-3xl text-on-primary">favorite</span>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-on-surface-variant">{t("discover.hint")}</p>
        <Link
          to="/onboarding"
          className="mt-4 block text-center text-sm font-semibold text-primary hover:underline"
        >
          {t("discover.fillProfile")}
        </Link>
      </div>
    </div>
  );
}
