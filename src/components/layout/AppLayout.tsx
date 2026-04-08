import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navKeys = [
  { to: "/discover", icon: "explore", labelKey: "nav.discover" },
  { to: "/matches", icon: "favorite", labelKey: "nav.matches" },
  { to: "/profile", icon: "person", labelKey: "nav.profile" },
] as const;

function isMatchesActive(pathname: string): boolean {
  return pathname.startsWith("/matches") || pathname.startsWith("/chat");
}

export function AppLayout() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-[100dvh] w-full max-w-md flex-col bg-background font-body text-on-background">
      <main className="flex-1 pb-28">
        <Outlet />
      </main>
      <nav
        className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 justify-around rounded-t-3xl border border-outline-variant/20 bg-surface/80 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(0,77,52,0.08)] backdrop-blur-md"
        aria-label={t("nav.mainAria")}
      >
        {navKeys.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => {
              const active =
                item.to === "/matches" ? isMatchesActive(pathname) : isActive;
              return [
                "flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all active:scale-90",
                active
                  ? "scale-105 bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant opacity-60 hover:text-primary",
              ].join(" ");
            }}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={
                item.to === "/matches" && isMatchesActive(pathname)
                  ? { fontVariationSettings: "'FILL' 1, 'wght' 400" }
                  : undefined
              }
            >
              {item.icon}
            </span>
            <span className="mt-1 font-body text-[10px] font-semibold uppercase tracking-widest">
              {t(item.labelKey)}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
