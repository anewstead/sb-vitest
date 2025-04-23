import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

import type { PluginOption } from "vite";

const sbPlugin = storybookTest({
  configDir: ".storybook",
  storybookScript: "pnpm dev-sb --ci",
}) as PluginOption;

export default defineWorkspace([
  {
    extends: "./vitest.config.ts",
    test: {
      name: "functions",
      setupFiles: ["./vitest.setup.fn.ts"],
    },
  },
  {
    extends: "./vitest.config.ts",
    plugins: [sbPlugin],
    test: {
      name: "storybook",
      setupFiles: [".storybook/vitest.setup.sb.ts"],
    },
  },
]);
