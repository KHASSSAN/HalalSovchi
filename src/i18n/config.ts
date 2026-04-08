import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import ru from "@/locales/ru.json";
import uz from "@/locales/uz.json";

const STORAGE_KEY = "halal-sovchi-lang";

function setHtmlLang(lng: string) {
  document.documentElement.lang = lng.startsWith("ru") ? "ru" : "uz";
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
    },
    fallbackLng: "uz",
    supportedLngs: ["uz", "ru"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: STORAGE_KEY,
    },
  })
  .then(() => {
    setHtmlLang(i18n.resolvedLanguage ?? "uz");
  });

i18n.on("languageChanged", (lng) => {
  setHtmlLang(lng);
});

export default i18n;
