import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

import type { PluginOption } from "vite";

const sbPlugin = storybookTest({
  configDir: ".storybook",
  storybookScript: "npm run dev-sb --ci",
}) as PluginOption;

export default defineWorkspace([
  {
    // this should only pick up .spec files
    extends: "./vitest.config.ts",
    test: {
      globals: true,
      name: "node",
      environment: "node",
      exclude: ["**/*.test.*"],
    },
  },
  {
    // this should only pick up .test files
    extends: "./vitest.config.ts",
    test: {
      globals: true,
      name: "fn",
      environment: "jsdom",
      exclude: ["**/*.spec.*"],
      setupFiles: ["src/test/vitest.setup.ts"],
    },
  },
  {
    // this should only pick up .stories files
    extends: "./vitest.config.ts",
    plugins: [sbPlugin],
    test: {
      name: "sb",
      setupFiles: [".storybook/vitest.setup.ts"],
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
        headless: true,
        screenshotFailures: false,
        connectTimeout: 20000,
      },
    },
  },
]);
