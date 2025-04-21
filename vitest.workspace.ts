import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

import type { PluginOption } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const sbDir = path.join(rootDir, ".storybook");
const sbSetup = path.join(sbDir, "vitest.setup.sb.ts");
const testSetup = path.join(rootDir, "vitest.setup.fn.ts");

/*
 * Plugin runs tests for stories defined in Storybook config
 */
const sbPlugin = storybookTest({
  configDir: sbDir,
  storybookScript: "pnpm dev-sb --ci",
}) as PluginOption;

/*
 * Storybook tests are designed/required to render in a browser (Playwright).
 * Instead of using Node for standard functional tests, we also use the browser.
 *
 * This has no performance impact because:
 * 1. Browser has to be started up for Storybook anyway
 * 2. We run in headless mode, so there's no display overhead
 *
 * Running in browser provides significant advantages:
 * 1. Code is being tested in its intended output environment
 * 2. We can test with browser features such as window and session
 *
 * Note.
 * if a SSR/SSG setup was required e.g. nextjs
 * then running some test in a node environment would be correct
 * we could have a convention to use .spec for SS tests (.test for client tests)
 * and create a test configs accordingly
 */
export default defineWorkspace([
  {
    extends: "./vite.config.ts",
    test: {
      name: "functions",
      globals: true,
      root: "./src",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
        headless: true,
        screenshotFailures: false,
      },
      setupFiles: [testSetup],
    },
  },
  {
    extends: "./vite.config.ts",
    plugins: [sbPlugin],
    test: {
      name: "storybook",
      globals: true,
      root: "./src",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
        headless: true,
        screenshotFailures: false,
      },
      setupFiles: [sbSetup],
    },
  },
]);
