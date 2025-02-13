import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Import JSON translations directly
import enTranslation from "../../public/en.json";
import bnTranslation from "../../public/bn.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: true,
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: enTranslation },
      bn: { translation: bnTranslation }
    }
  });

export default i18n;