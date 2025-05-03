import React from "react";

import { themes } from "@storybook/theming";
import { initialize as mswInitialize, mswLoader } from "msw-storybook-addon";

import { i18n } from "@src/i18n/i18n";
import { I18N } from "@src/i18n/i18n.const";
import { handlers } from "@src/test/msw/defaultHandlers";

import { AutoDocsTemplate } from "./AutoDocsTemplate";
import { customViewports } from "./customViewports";
import { ThemeDocsContainer } from "./ThemeDocsContainer";
import { ThemePreviewContainer } from "./ThemePreviewContainer";

import type { DocsContextProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";

// https://github.com/mswjs/msw-storybook-addon#configuring-msw
// quiet : true - MSW log is noisy when running tests in terminal \
// it can be a bit misleading and a distraction to debugging
mswInitialize({
  onUnhandledRequest: "bypass",
  quiet: true,
});

const preview: Preview = {
  parameters: {
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
    (Story, context) => {
      if (!context.parameters.removeGlobalThemeDecorator) {
        return <ThemePreviewContainer>{Story(context)}</ThemePreviewContainer>;
      }
      return <>{Story(context)}</>;
    },
  ],

  loaders: [mswLoader],
  tags: ["autodocs"],
};

export default preview;
