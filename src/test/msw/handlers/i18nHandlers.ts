import { http, HttpResponse } from "msw";

import { I18N } from "@src/i18n/i18n.const";
import { common } from "@src/test/mocks/i18n/common";
import { home } from "@src/test/mocks/i18n/home";

import type { Locale, Namespace } from "@src/i18n/i18n.const";

// Single source of truth for translations
const baseTranslations = {
  common,
  home,
};

// Helper to create language-specific translations\
// adds language prefix to base i18n mock entries\
// e.g. [en-GB] Hello
const createTranslations = (locale: Locale) => {
  const prefix = `[${locale}] `;
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
const mockTranslations = Object.fromEntries(
  Object.values(I18N.LOCALE).map((locale) => {
    return [locale, createTranslations(locale)];
  })
);

export const i18nSuccess = http.get(I18N.JSON.MSW, ({ params }) => {
  const lng = params.lng as Locale;
  const ns = params.ns as Namespace;
  if (lng in mockTranslations && ns in mockTranslations[lng]) {
    return HttpResponse.json(mockTranslations[lng][ns]);
  }
  return new HttpResponse(null, { status: 404 });
});

export const i18nError = http.get(I18N.JSON.MSW, () => {
  return new HttpResponse(null, { status: 500 });
});

export const i18nSlow = http.get(I18N.JSON.MSW, async () => {
  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  return HttpResponse.json(mockTranslations[I18N.DEFAULT_LOCALE].common);
});
