import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { I18N } from "./i18n.const";

/**
 * Init wrapper required for storybook. The i18next docs show i18n inits
 * immediately at config but for storybook tests we need to ensure init happens
 * at correct time, i.e. after MSW has initialised
 */
let initialized = false;

const initI18n = async () => {
  await i18next
    .use(LanguageDetector)
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: I18N.JSON.PATH,
      },
      detection: {
        order: ["htmlTag"],
        caches: [], // disable saving detected language to localStorage or cookie for clean testing
      },
      load: "currentOnly",
      ns: Object.values(I18N.JSON.NS),
      defaultNS: I18N.JSON.NS.COMMON,
      fallbackLng: I18N.LOCALE.EN_GB,
      supportedLngs: Object.values(I18N.LOCALE),
      nonExplicitSupportedLngs: false,
      interpolation: {
        escapeValue: false,
      },
    });

  initialized = true;
  window.i18n = i18next;
};

export const getI18n = () => {
  if (!initialized) {
    void initI18n();
  }
  return i18next;
};

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
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/naming-convention
  interface Window {
    i18n: typeof i18next;
  }
}
/* ------------------------------------------------------------ */
