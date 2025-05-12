import type { ILocale, INamespace } from "./i18n.type";

// i18n folder in public folder
const base = "/i18n/";

export const I18N = {
  JSON: {
    PATH: `${base}{{lng}}/{{ns}}.json`,
    MSW: `${base}:lng/:ns.json`,
    NS: {
      COMMON: "common" as INamespace,
      HOME: "home" as INamespace,
    },
  },
  CONTENT: {
    PATH: `${base}{{lng}}/content/{{ns}}`,
    MSW: `${base}:lng/content/:ns`,
  },
  LOCALE: {
    EN_GB: "en-GB" as ILocale,
    ES_ES: "es-ES" as ILocale,
  },
  DEFAULT_LOCALE: "en-GB" as ILocale,
} as const;
