import React from "react";

import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { themes } from "@storybook/theming";
import { initialize as mswInitialize, mswLoader } from "msw-storybook-addon";

import { i18n } from "@src/i18n/i18n";
import { I18N } from "@src/i18n/i18n.const";
import { allThemes, defaultTheme } from "@src/style/theme";
import { handlers } from "@src/test/msw/defaultHandlers";

import { AutoDocsTemplate } from "./AutoDocsTemplate";
import { customViewports } from "./customViewports";
import { ThemeDocsContainer } from "./ThemeDocsContainer";
import { ThemePreviewContainer } from "./ThemePreviewContainer";

import type { DocsContextProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";

// if running storybook in browser or tests on CLI
const isVitestEnv = window.location.href.includes("__vitest_test__");

mswInitialize({
  onUnhandledRequest: "bypass",
  quiet: isVitestEnv, // Quiet in test environment
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      stylePreview: true,
      dark: { ...themes.dark, appPreviewBg: "#1B1C1D" },
    },
    docs: {
      container: ({
        children,
        context,
      }: {
        children: React.ReactNode;
        context: DocsContextProps;
      }) => {
        return (
          <ThemeDocsContainer context={context}>{children}</ThemeDocsContainer>
        );
      },
      page: () => {
        return <AutoDocsTemplate />;
      },
    },
    msw: {
      handlers,
    },
    viewport: {
      viewports: customViewports,
      defaultViewport: "reset",
    },
    i18n,
  },

  initialGlobals: {
    locale: I18N.DEFAULT_LOCALE,
    locales: Object.fromEntries(
      Object.values(I18N.LOCALE).map((value) => {
        return [value, value];
      })
    ),
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: allThemes,
      defaultTheme: defaultTheme.name,
      Provider: ThemePreviewContainer,
    }),
  ],

  loaders: [mswLoader],
  tags: ["autodocs"],
};

export default preview;
