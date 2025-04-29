import React from "react";

import { themes } from "@storybook/theming";
import { initialize as mswInitialize, mswLoader } from "msw-storybook-addon";

import { i18n } from "@src/i18n/i18n";
import { handlers } from "@src/test/msw/handlers/all";

import { AutoDocsTemplate } from "./AutoDocsTemplate";
import { customViewports } from "./customViewports";
import { ThemeDocsContainer } from "./ThemeDocsContainer";
import { ThemePreviewContainer } from "./ThemePreviewContainer";

import type { DocsContextProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";

// https://github.com/mswjs/msw-storybook-addon#configuring-msw
// MSW default log level is noisy and a bit misleading
// hence the quiet option
mswInitialize({
  onUnhandledRequest: "bypass",
  quiet: true,
});

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },  // tmp commented possibly uneeded
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
    locale: "en-GB",
    locales: {
      "en-GB": "English (GB)",
      "es-ES": "Español (ES)",
    },
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
