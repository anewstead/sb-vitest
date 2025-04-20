import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

import { viteAlias } from "./viteAliasPlugin";

import type { ServerOptions, UserConfig } from "vite";

const resolve: UserConfig["resolve"] = {
  conditions: ["mui-modern", "module", "browser", "development|production"],
  alias: [viteAlias("@src/", "./src/")],
};

/**
 * DevServer\
 * This config also used by storybook\
 *
 * HMR watch options for localhost during development\
 * Cannot set cwd to ./src as also need to watch public folder (and others)\
 * So specify what not to watch (.git and node_modules are default ignored)\
 * Glob but must be root path or be fully recursive\
 *
 * - Path.resolve("./dist") = dist folder in project root\
 * - Dist = all "dist" folders\
 */
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

const devConfig: UserConfig = {
  resolve,
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  css: {
    devSourcemap: true,
  },
  server: devServer,
};

const buildProd: UserConfig = {
  resolve,
  plugins: [react()],
  css: {
    devSourcemap: false,
  },
};

// https://vitejs.dev/guide/env-and-mode.html#modes
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return devConfig;
  }
  return buildProd;
});
