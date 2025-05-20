import React, { Suspense, useEffect } from "react";

import { I18nextProvider } from "react-i18next";

import { getI18n } from "@src/i18n/i18n";
import { I18N } from "@src/i18n/i18n.const";

import type { Decorator } from "@storybook/react";

// Wrap stories with i18n provider
export const withI18n: Decorator = (Story, context) => {
  const locale = (context.globals.locale as string) || I18N.DEFAULT_LOCALE;
  const i18n = getI18n();

  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

export const i18nConfig = {
  locale: {
    description: "i18n locale",
    defaultValue: I18N.DEFAULT_LOCALE,
    toolbar: {
      icon: "globe",
      items: Object.values(I18N.LOCALE).map((value) => {
        return { value, title: value };
      }),
    },
  },
};
