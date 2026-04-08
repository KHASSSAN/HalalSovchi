import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ChatPage() {
  const { matchId } = useParams();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface-container-low font-body text-on-background">
      <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-outline-variant/30 bg-surface/90 px-4 py-3 backdrop-blur-md">
        <Link
          to="/matches"
          className="text-primary active:scale-95"
          aria-label={t("chat.backAria")}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-headline text-lg font-bold capitalize text-on-surface">
          {matchId ?? t("chat.fallbackTitle")}
        </h1>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <p className="text-on-surface-variant">{t("chat.placeholder")}</p>
      </div>
    </div>
  );
}
