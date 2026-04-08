import WebApp from "@twa-dev/sdk";

/**
 * Call once on app load. Expands Mini App and applies Telegram theme CSS variables.
 * Outside Telegram, this is a no-op where SDK allows.
 */
export function initTelegramWebApp(): void {
  try {
    WebApp.ready();
    WebApp.expand();
    applyThemeParams();
    WebApp.onEvent("themeChanged", applyThemeParams);
  } catch {
    // Dev in browser without Telegram
  }
}

function applyThemeParams(): void {
  const p = WebApp.themeParams;
  const root = document.documentElement;
  if (p.bg_color) root.style.setProperty("--tg-theme-bg-color", p.bg_color);
  if (p.text_color) root.style.setProperty("--tg-theme-text-color", p.text_color);
  if (p.hint_color) root.style.setProperty("--tg-theme-hint-color", p.hint_color);
  if (p.link_color) root.style.setProperty("--tg-theme-link-color", p.link_color);
  if (p.button_color) root.style.setProperty("--tg-theme-button-color", p.button_color);
  if (p.button_text_color)
    root.style.setProperty("--tg-theme-button-text-color", p.button_text_color);
  if (p.secondary_bg_color)
    root.style.setProperty("--tg-theme-secondary-bg-color", p.secondary_bg_color);
}

export function getInitData(): string | undefined {
  try {
    return WebApp.initData;
  } catch {
    return undefined;
  }
}

export { WebApp };
