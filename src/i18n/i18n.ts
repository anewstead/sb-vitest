import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

/* ------------------------------------------------------------ */
/**
 * For switching when running dev server\
 * (not for storybook that has a dropdown)\
 * E.g. in browser console\
 *
 * ```js
 * i18n.changeLanguage("es-ES");
 * ```
 */

declare global {
  interface Window {
    i18n: typeof i18n;
  }
}
window.i18n = i18n;
/* ------------------------------------------------------------ */

// IMPORTANT - language configure to only be lang-COUNTRY
void i18n
  .use(LanguageDetector)
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/i18n/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["htmlTag", "navigator", "localStorage", "cookie"], // optional, override as needed
      caches: [], // disable saving detected language to localStorage or cookie for clean testing
    },
    // load: "languageOnly", // keep if commented just in case (not obvious find in docs)
    ns: ["common", "home"],
    defaultNS: "common",
    fallbackLng: "en-GB",
    supportedLngs: ["en-GB", "es-ES"],
    nonExplicitSupportedLngs: false,
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
