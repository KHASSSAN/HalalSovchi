import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function RulesPage() {
  const { t } = useTranslation();
  const items = t("rules.items", { returnObjects: true }) as string[];

  return (
    <div className="min-h-[100dvh] bg-background px-6 pb-12 pt-16 font-body text-on-background">
      <h1 className="font-headline text-3xl font-extrabold text-on-surface">{t("rules.title")}</h1>
      <ul className="mt-6 list-disc space-y-3 pl-5 text-on-surface-variant">
        {items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-on-surface-variant">{t("rules.footer")}</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-primary">
        {t("rules.home")}
      </Link>
    </div>
  );
}
