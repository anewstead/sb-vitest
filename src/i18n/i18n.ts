import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

/* ------------------------------------------------------------ */
/**
 * Uncomment to make i18n available in the window object\
 * E.g. in browser console\
 *
 * ```js
 * i18n.changeLanguage("es-ES");
 * ```
 */

// declare global {
//   interface Window {
//     i18n: typeof i18n;
//   }
// }
// window.i18n = i18n;
/* ------------------------------------------------------------ */

void i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/i18n/{{lng}}/{{ns}}.json",
    },
    ns: ["common", "home"],
    defaultNS: "common",
    lng: "en-GB",
    fallbackLng: "en-GB",
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
