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

/** initData из SDK или напрямую из window.Telegram (после telegram-web-app.js). */
export function getInitData(): string | undefined {
  try {
    const fromSdk = WebApp.initData;
    if (fromSdk && fromSdk.length > 0) return fromSdk;
  } catch {
    /* ignore */
  }
  try {
    const tg = (window as unknown as { Telegram?: { WebApp?: { initData?: string } } }).Telegram
      ?.WebApp;
    const raw = tg?.initData;
    if (raw && raw.length > 0) return raw;
  } catch {
    /* ignore */
  }
  return undefined;
}

/**
 * В WebView initData иногда заполняется чуть позже первого кадра — опрашиваем коротко.
 */
export function waitForInitData(timeoutMs = 5000, pollMs = 80): Promise<string | undefined> {
  const immediate = getInitData();
  if (immediate) return Promise.resolve(immediate);
  const start = Date.now();
  return new Promise((resolve) => {
    const id = window.setInterval(() => {
      const d = getInitData();
      if (d) {
        window.clearInterval(id);
        resolve(d);
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        window.clearInterval(id);
        resolve(undefined);
      }
    }, pollMs);
  });
}

export { WebApp };
