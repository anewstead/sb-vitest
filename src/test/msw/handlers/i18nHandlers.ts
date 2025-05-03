import { http, HttpResponse } from "msw";

const I18N_PATH = "/i18n/:lng/:ns.json";

type Locale = "en-GB" | "es-ES";
type Namespace = "common" | "home";

type Translations = Record<Locale, Record<Namespace, Record<string, string>>>;

// Single source of truth for translations
const baseTranslations = {
  common: {
    errorLoading: "Error loading: {{error}}",
    goodbye: "Goodbye",
    hello: "Hello",
    loading: "Loading...",
    login: "Login",
    logout: "Logout",
    signup: "Sign Up",
    welcome: "Welcome",
  },
  home: {
    changeText: "Change Text",
    exampleTextFromRedux: "Example Text: {{text}}",
    pagesInStorybook: "Pages in Storybook",
    viewportTip: "Viewport Tip: {{icon}}",
  },
};

// Helper to create language-specific translations\
// adds language prefix to all translations\
// e.g. [en-GB] Hello
const createTranslations = (lang: Locale) => {
  const prefix = `[${lang}] `;
  return Object.fromEntries(
    Object.entries(baseTranslations).map(([namespace, translations]) => {
      return [
        namespace,
        Object.fromEntries(
          Object.entries(translations).map(([key, value]) => {
            return [key, `${prefix}${value}`];
          })
        ),
      ];
    })
  ) as Record<Namespace, Record<string, string>>;
};

// Generate translations for all supported languages
const mockTranslations: Translations = {
  "en-GB": createTranslations("en-GB"),
  "es-ES": createTranslations("es-ES"),
};

export const i18nSuccess = http.get(I18N_PATH, ({ params }) => {
  const locale = params.lng as Locale;
  const namespace = params.ns as Namespace;

  if (locale in mockTranslations && namespace in mockTranslations[locale]) {
    return HttpResponse.json(mockTranslations[locale][namespace]);
  }

  return new HttpResponse(null, { status: 404 });
});

export const i18nError = http.get(I18N_PATH, () => {
  console.error("[MSW] Simulating content load error (500)");
  return new HttpResponse(null, { status: 500 });
});

export const i18nSlow = http.get(I18N_PATH, async () => {
  await new Promise((resolve) => {
    return setTimeout(resolve, 2000);
  });
  return HttpResponse.json(mockTranslations["en-GB"].common);
});
