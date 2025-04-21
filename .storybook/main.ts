import type { StorybookConfig } from "@storybook/react-vite";

const sbConfig: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    // "@chromatic-com/storybook",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/experimental-addon-test",
    "storybook-dark-mode",
    "storybook-addon-remix-react-router",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {},
  staticDirs: ["./static"],
};
export default sbConfig;
