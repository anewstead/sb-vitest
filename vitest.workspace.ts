import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

import type { PluginOption } from "vite";

const ROOT_TEST_CONFIG = "./vitest.config.ts";
const SETUP_FN = "src/test/setupFnTest.ts";
const SETUP_SB = ".storybook/setupSbTest.ts";

const sbPlugin = storybookTest({
  configDir: ".storybook",
  storybookScript: "npm run dev-sb --ci",
}) as PluginOption;

export default defineWorkspace([
  {
    // this should only pick up .spec files
    extends: ROOT_TEST_CONFIG,
    test: {
      globals: true,
      name: "node",
      environment: "node",
      exclude: ["**/*.test.*"],
    },
  },
  {
    // this should only pick up .test files
    extends: ROOT_TEST_CONFIG,
    test: {
      globals: true,
      name: "fn",
      environment: "jsdom",
      exclude: ["**/*.spec.*"],
      setupFiles: [SETUP_FN],
    },
  },
  {
    // this should only pick up .stories files
    extends: ROOT_TEST_CONFIG,
    plugins: [sbPlugin],
    test: {
      name: "sb",
      setupFiles: [SETUP_SB],
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
