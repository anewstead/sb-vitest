import React from "react";

import { themes } from "@storybook/theming";
import { initialize as mswInitialize, mswLoader } from "msw-storybook-addon";

// TODO: msw example
import { handlers } from "@src/testing/msw/handlers/all";

import { AutoDocsTemplate } from "./AutoDocsTemplate";
import { customViewports } from "./customViewports";
import { ThemeDocsContainer } from "./ThemeDocsContainer";
import { ThemePreviewContainer } from "./ThemePreviewContainer";

import type { DocsContextProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";

// https://github.com/mswjs/msw-storybook-addon#configuring-msw
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

// a11y setting may be required
// (it was added during an auto upgrade adding the addon-test)
// a11y: {
//   // 'todo' - show a11y violations in the test UI only
//   // 'error' - fail CI on a11y violations
//   // 'off' - skip a11y checks entirely
//   test: "todo",
// },
