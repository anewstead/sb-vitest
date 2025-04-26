import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig({ command: "serve", mode: "development" }),
  test: {
    globals: true,
    watch: false,
    exclude: [
      "**/.*/**",
      "**/build/**",
      "**/coverage/**",
      "**/dist/**",
      "**/eslint/**",
      "**/node_modules/**",
      "**/public/**",
      "**/storybook-static/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "**/*.stories.{ts,tsx}",
        "**/*.test.{ts,tsx}",
        "**/*.mock.{ts,tsx}",
        "**/*.type.ts",
        "**/*.d.ts",
        "**/__tests__/**",
        "**/__mocks__/**",
        "src/test/**",
        "src/root/**",
      ],
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
