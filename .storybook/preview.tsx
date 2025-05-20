import React from "react";

import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { themes } from "@storybook/theming";
import { initialize as mswInitialize, mswLoader } from "msw-storybook-addon";

import { allThemes, defaultTheme } from "@src/style/theme";
import { handlers } from "@src/test/msw/defaultHandlers";

import { AutoDocsTemplate } from "./AutoDocsTemplate";
import { customViewports } from "./customViewports";
import { ThemeDocsContainer } from "./decorators/theme/ThemeDocsContainer";
import { ThemePreviewContainer } from "./decorators/theme/ThemePreviewContainer";
import { i18nConfig, withI18n } from "./decorators/withI18n";

import type { DocsContextProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";

// if storybook in browser or tests on CLI
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
  },

  globalTypes: i18nConfig,

  decorators: [
    withI18n,
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
