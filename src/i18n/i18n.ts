import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enGB from "./locales/en-GB.json";
import esES from "./locales/es-ES.json";

void i18n.use(initReactI18next).init({
  resources: {
    "en-GB": enGB,
    "es-ES": esES,
  },
  lng: "en-GB",
  fallbackLng: "en-GB",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
