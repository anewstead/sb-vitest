import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

import type { PluginOption, ServerOptions, UserConfig } from "vite";

// resolve here is not for alias paths
// see paths in tsconfig.json loaded via vite-tsconfig-paths
const resolve: UserConfig["resolve"] = {
  conditions: ["mui-modern", "module", "browser", "development|production"],
};

export const devServer: ServerOptions = {
  watch: {
    ignored: [
      "**/.nyc_output",
      path.resolve("./coverage"),
      path.resolve("./dist"),
      path.resolve("./build"),
      path.resolve("./storybook-static"),
    ],
  },
};

/*
https://vitejs.dev/guide/env-and-mode.html#modes
*/
export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve" && mode === "development";
  const isTest = command === "serve" && process.env.VITEST;

  const plugins: PluginOption[] = [tsconfigPaths(), react()];

  if (!isTest) {
    plugins.push(checker({ typescript: true }));
  }

  return {
    resolve,
    plugins,
    css: {
      devSourcemap: isDev,
    },
    server: devServer,
  };
});
