import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

import type { PluginOption } from "vite";

const sbPlugin = storybookTest({
  configDir: ".storybook",
  storybookScript: "npm run dev-sb --ci",
}) as PluginOption;

export default defineWorkspace([
  "./vitest.config.ts",
  {
    extends: "./vitest.config.ts",
    plugins: [sbPlugin],
    test: {
      name: "storybook",
      setupFiles: [".storybook/vitest.setup.ts"],
    },
  },
]);
