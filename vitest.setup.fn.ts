import { worker } from "@src/testing/msw/browser";

/*
setup for functional .test.ts files
all tsx should be stories
see also .storybook/vitest.setup.ts
*/

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
