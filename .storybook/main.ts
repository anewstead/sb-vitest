import type { StorybookConfig } from "@storybook/react-vite";

const sbConfig: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/experimental-addon-test",
    "storybook-addon-remix-react-router",
    "storybook-dark-mode",
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
