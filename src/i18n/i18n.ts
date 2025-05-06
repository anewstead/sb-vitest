import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { I18N } from "./i18n.const";

// IMPORTANT - language configure to only be lang-COUNTRY
void i18n
  .use(LanguageDetector)
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: I18N.JSON.PATH,
    },
    detection: {
      order: ["htmlTag", "navigator", "localStorage", "cookie"], // optional, override as needed
      caches: [], // disable saving detected language to localStorage or cookie for clean testing
    },
    // load: "languageOnly", // keep if commented just in case (not obvious find in docs)
    ns: Object.values(I18N.JSON.NS),
    defaultNS: I18N.JSON.NS.COMMON,
    fallbackLng: I18N.LOCALE.EN_GB,
    supportedLngs: Object.values(I18N.LOCALE),
    nonExplicitSupportedLngs: false,
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };

/* ------------------------------------------------------------ */
/**
 * Adds i18n to the window object\
 * For switching when running dev server\
 * (not for storybook that has a dropdown)\
 * E.g. in browser console\
 *
 * ```js
 * i18n.changeLanguage("es-ES");
 * ```
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    i18n: typeof i18n;
  }
}
window.i18n = i18n;
/* ------------------------------------------------------------ */
