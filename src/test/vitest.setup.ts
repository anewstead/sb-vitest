/**
 * Setup for functional .test.ts files\
 * All tsx are components and should be .stories.tsx\
 * See also .storybook/vitest.setup.ts
 */

import { worker } from "./msw/browser";

// MSW default log level is noisy and a bit misleading
// hence the quiet option
beforeAll(async () => {
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
