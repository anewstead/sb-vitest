/**
 * Setup for functional .test.ts files\
 * All tsx are components and should be .stories.tsx\
 * See also .storybook/vitest.setup.ts
 */

import { i18n } from "@src/i18n/i18n";

import { worker } from "./msw/browser";

// Initialize i18n and MSW before all tests
beforeAll(async () => {
  // Initialize i18n for tests
  await i18n.init();

  // MSW default log level is noisy and a bit misleading
  // hence the quiet option
  await worker.start({
    onUnhandledRequest: "bypass",
    quiet: true,
  });
});

afterEach(() => {
  worker.resetHandlers();
});

afterAll(() => {
  worker.stop();
});
