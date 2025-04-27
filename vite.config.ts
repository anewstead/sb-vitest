/**
 * https://vitejs.dev/guide/env-and-mode.html#modes
 */

import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

import type { PluginOption } from "vite";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve" && mode === "development";
  const isTest = command === "serve" && process.env.VITEST;

  const plugins: PluginOption[] = [tsconfigPaths(), react()];
  if (!isTest) {
    plugins.push(checker({ typescript: true }));
  }

  return {
    resolve: {
      // default + mui-modern
      conditions: ["mui-modern", "module", "browser", "development|production"],
    },
    plugins,
    css: {
      devSourcemap: isDev,
    },
    server: {
      watch: {
        /**
         * Cannot set list of paths to watch\
         * Or set root/cwd to src as we need to watch other too\
         * So have to add ignores, so they don't trigger HMR when changed
         * node_modules and .git ignored by default
         */
        ignored: [
          path.resolve("./build"),
          path.resolve("./coverage"),
          path.resolve("./dist"),
          path.resolve("./storybook-static"),
        ],
      },
    },
    optimizeDeps: {
      // Disable source maps for dependencies in test mode
      esbuildOptions: {
        sourcemap: !isTest,
      },
    },
  };
});
