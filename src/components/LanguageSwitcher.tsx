import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
  /** Компактный вид — только две кнопки в ряд */
  variant?: "default" | "compact";
};

export function LanguageSwitcher({ className = "", variant = "default" }: Props) {
  const { t, i18n } = useTranslation();
  const resolved = i18n.resolvedLanguage?.startsWith("ru") ? "ru" : "uz";

  const btn = (lang: "uz" | "ru", label: string) => (
    <button
      type="button"
      onClick={() => void i18n.changeLanguage(lang)}
      className={[
        "flex items-center rounded-full px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high",
        resolved === lang
          ? "bg-surface-container-high ring-2 ring-primary ring-offset-2 ring-offset-background"
          : "bg-surface-container-low",
        variant === "compact" ? "flex-1 justify-center" : "",
      ].join(" ")}
    >
      {variant === "default" && lang === "uz" ? (
        <span className="material-symbols-outlined mr-2 text-sm">language</span>
      ) : null}
      {label}
    </button>
  );

  return (
    <div
      className={[
        "flex items-center justify-center gap-2",
        variant === "compact" ? "w-full max-w-xs" : "space-x-2",
        className,
      ].join(" ")}
      role="group"
      aria-label={t("common.languageSwitcherAria")}
    >
      {btn("uz", t("home.langUz"))}
      {variant === "default" ? (
        <div className="h-4 w-px bg-outline-variant opacity-30" aria-hidden />
      ) : null}
      {btn("ru", t("home.langRu"))}
    </div>
  );
}
