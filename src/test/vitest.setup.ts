/**
 * Setup for functional .test.ts files\
 * All tsx are components and should be .stories.tsx\
 * See also .storybook/vitest.setup.ts
 */

import { server } from "./msw/server";

// Initialize MSW and i18n before all tests
beforeAll(() => {
  // Start MSW server first to intercept requests
  server.listen({
    onUnhandledRequest: "bypass",
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
