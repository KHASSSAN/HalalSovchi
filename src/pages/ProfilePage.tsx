import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TelegramAuthStatus } from "@/components/TelegramAuthStatus";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { isSupabaseConfigured } from "@/lib/supabase";

const IMG_MAIN =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCM4GB8TOo3b3uhI4PTQH1blykuRD3Tpy0lbZ-hgb7BBduKBKN_NgohCcKUKdkdmKiErmQxXrAsPJo6sZ_GN7fKXhkwFtB25tGaYvPeXyjT_tWHJ5ixFpa5px9SZY4cnIAZWoHWjnl51W7kfL8x6UazM9gJh2_euDZby2zmh03WlejzEUh2xeyz4mZCIIXTpVhnOP_6SfDmeW5OKXuV3mzAfcOOAUPmjajUepa3IOJlURl7xNEhbPlMnKCP9RdxKZjhl-x0RayLG5Mh";
const IMG_TEA =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATBIPCfxGyMLQBvxxtk-nBd6rGIQfT5KqkGlmBrrxtQFAY6uefLdZcEZRfJbzJCW-B8I29fQQjqxs6vFfyfbyrr0U8vnuhP-pw5nKcdnOzzMNq6Xi_mocF1vUD99FS_l-YpD2ukl082J1MT412p-DxcXtMs7_3xlc71vG-SG5_EXwIrorK33wZ5ZMYtTpzGPw5w5HZryy-4mKclkRzoYydXzd0L9qK9f7RUt6D3wGLxIMdUiENNsBHK-TYaqgZ0l5sbCA0NkwO1bK_";
const IMG_REG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDIaysDUDjcdIprzVYd-wMHs_ausqspLB2YjS3t4Pmce_Dm1pfZSZvVXAj055CSg6Em0D3UJUAaulf9LwW1mlkkSj0gbmhZl6hysfSrYdm8YExFtNLgsqK0znyZdtf1jYNO3EOk6WXehBI9_sVbeFb4KT21yb1ImOBXsT0GZI07-dIXWd38yoaH9en2crsDxdQDrmz7BxbpqeyCI0bvulMLkNRy2uRT6AY98puSU8xrW1T1CiEL7FeYm862y5b6PKj9MI2zlKMRLDsX";

export function ProfilePage() {
  const { t } = useTranslation();
  const backend = isSupabaseConfigured();
  const chips = t("profile.chips", { returnObjects: true }) as string[];
  const tags = t("profile.tags", { returnObjects: true }) as string[];

  const deenRows = [
    { icon: "prayer_times", labelKey: "profile.deen.prayers", valueKey: "profile.deen.prayersVal" },
    { icon: "restaurant", labelKey: "profile.deen.food", valueKey: "profile.deen.foodVal" },
    { icon: "water_drop", labelKey: "profile.deen.alcohol", valueKey: "profile.deen.alcoholVal" },
    { icon: "volunteer_activism", labelKey: "profile.deen.values", valueKey: "profile.deen.valuesVal" },
  ] as const;

  return (
    <div className="min-h-[100dvh] bg-surface pb-36 font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <header className="fixed top-0 z-50 flex w-full max-w-md items-center justify-between bg-surface/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            to="/discover"
            className="text-primary transition-transform active:scale-95"
            aria-label={t("profile.backAria")}
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h1 className="font-headline text-lg font-bold tracking-tight text-primary">
            {t("profile.headerTitle")}
          </h1>
        </div>
        <button type="button" className="text-primary active:scale-95" aria-label={t("profile.menuAria")}>
          <span className="material-symbols-outlined text-2xl">more_vert</span>
        </button>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-40 pt-20">
        <section className="mb-10 grid h-[500px] grid-cols-12 gap-3">
          <div className="col-span-8 h-full overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,77,52,0.08)]">
            <img alt="" src={IMG_MAIN} className="h-full w-full object-cover" />
          </div>
          <div className="col-span-4 flex h-full flex-col gap-3">
            <div className="h-1/2 overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,77,52,0.08)]">
              <img alt="" src={IMG_TEA} className="h-full w-full object-cover" />
            </div>
            <div className="h-1/2 overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,77,52,0.08)]">
              <img alt="" src={IMG_REG} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">
                {t("profile.name")}
              </h2>
              <div className="mt-1 flex items-center gap-2 font-medium text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">location_on</span>
                <span>{t("profile.location")}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-secondary-container px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              {t("profile.verified")}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-surface-container-low px-4 py-1.5 text-sm font-medium text-on-surface-variant"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="rounded-xl bg-surface-container-low p-6">
            <h3 className="font-headline mb-3 text-lg font-bold text-primary">{t("profile.aboutTitle")}</h3>
            <p className="leading-relaxed text-on-surface-variant">{t("profile.aboutText")}</p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="font-headline mb-6 flex items-center gap-3 text-xl font-bold text-on-surface">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-xl">mosque</span>
            </span>
            {t("profile.deenTitle")}
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {deenRows.map((row) => (
              <div
                key={row.labelKey}
                className="flex items-center gap-4 rounded-xl bg-surface-container-low p-4"
              >
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {row.icon}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    {t(row.labelKey)}
                  </p>
                  <p className="font-semibold text-on-surface">{t(row.valueKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="font-headline mb-6 flex items-center gap-3 text-xl font-bold text-on-surface">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-xl">work</span>
            </span>
            {t("profile.workTitle")}
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="material-symbols-outlined mt-1 text-secondary">school</span>
              <div>
                <p className="font-bold text-on-surface">{t("profile.degree")}</p>
                <p className="text-sm text-on-surface-variant">{t("profile.school")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined mt-1 text-secondary">badge</span>
              <div>
                <p className="font-bold text-on-surface">{t("profile.jobTitle")}</p>
                <p className="text-sm text-on-surface-variant">{t("profile.jobPlace")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="rounded-3xl border border-primary/10 bg-primary/5 p-8">
            <h3 className="font-headline mb-4 text-xl font-bold text-primary">{t("profile.lookingTitle")}</h3>
            <p className="italic leading-relaxed text-on-surface-variant">{t("profile.lookingText")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <TelegramAuthStatus />

        <div className="mb-6 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            {t("profile.languageLabel")}
          </p>
          <LanguageSwitcher variant="compact" />
        </div>

        <p className="text-center text-xs text-on-surface-variant">
          {backend ? t("profile.supabaseOk") : t("profile.supabaseMissing")}
        </p>
      </main>

      <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-outline-variant/20 bg-surface/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl gap-4">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-highest text-primary transition-transform active:scale-90"
            aria-label={t("profile.favoritesAria")}
          >
            <span className="material-symbols-outlined text-2xl">favorite</span>
          </button>
          <button
            type="button"
            className="flex h-14 flex-1 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-lg font-bold text-white shadow-[0_8px_24px_rgba(0,77,52,0.15)] transition-transform active:scale-[0.98]"
          >
            {t("profile.sendInterest")}
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
