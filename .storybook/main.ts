import { devServer } from "../vite.config";

import type { StorybookConfig } from "@storybook/react-vite";
import type { UserConfig } from "vite";

const sbConfig: StorybookConfig = {
  async viteFinal(config) {
    // dynamic import vite to resolve CJS warning
    // https://github.com/storybookjs/storybook/issues/26291#issuecomment-1978193283
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      // additions/overrides here
      server: {
        ...config.server,
        ...devServer, // added as watch.ignore is not being passed as expected in merge!
      },
      publicDir: "./static",
    } satisfies UserConfig);
  },
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
    disableWhatsNewNotifications: true,
  },
  docs: {},
  staticDirs: ["./static"],
};
export default sbConfig;
