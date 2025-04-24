import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig({ command: "serve", mode: "development" }),
  test: {
    globals: true,
    watch: false,
    name: "functions",
    setupFiles: ["./vitest.setup.fn.ts"],
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
      headless: true,
      screenshotFailures: false,
      connectTimeout: 20000,
    },
  },
});
