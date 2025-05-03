// i18n folder in public folder
const base = "/i18n/";

// LOCALE = language-COUNTRY = folder name
export type Locale = "en-GB" | "es-ES";

// NS = namespace = file name
export type Namespace = "common" | "home";

export const I18N = {
  JSON: {
    PATH: `${base}{{lng}}/{{ns}}.json`,
    MSW: `${base}:lng/:ns.json`,
    NS: {
      COMMON: "common" as Namespace,
      HOME: "home" as Namespace,
    },
  },
  CONTENT: {
    PATH: `${base}{{lng}}/content/{{ns}}`,
    MSW: `${base}:lng/content/:ns`,
  },
  LOCALE: {
    EN_GB: "en-GB" as Locale,
    ES_ES: "es-ES" as Locale,
  },
  DEFAULT_LOCALE: "en-GB" as Locale,
} as const;
