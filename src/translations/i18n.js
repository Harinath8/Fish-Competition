import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { TRANSLATIONS_EN } from "./en/translation";
import { TRANSLATIONS_AR } from "./ar/translation";

const fallbackLng = ["en"];
const availableLanguages = ["en", "ar"];

const options = {
  order: ["navigator", "htmlTag", "path", "subdomain"],

  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  htmlTag: document.documentElement,
  checkWhitelist: true,
};

i18n
  .use(Backend)

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    // lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng,
    debug: false,
    whitelist: availableLanguages,
    detection: options,

    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      ar: {
        translation: TRANSLATIONS_AR,
      },
    },

    react: {
      useSuspense: false
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
