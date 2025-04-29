import type { StorybookConfig } from "@storybook/react-vite";

const sbConfig: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/experimental-addon-test",
    "storybook-dark-mode",
    "storybook-addon-remix-react-router",
    "@storybook/addon-a11y",
    "storybook-react-i18next",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },

  docs: {},

  staticDirs: ["./static"],
};

export default sbConfig;
