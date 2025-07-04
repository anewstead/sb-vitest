/**
 * https://vitejs.dev/guide/env-and-mode.html#modes
 */

import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

import type { PluginOption } from "vite";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve" && mode === "development";
  const isTest = command === "serve" && process.env.VITEST;

  const plugins: PluginOption[] = [tsconfigPaths(), react(), tailwindcss()];
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
      include: [
        "storybook-dark-mode",
        "i18next",
        "i18next-browser-languagedetector",
        "i18next-http-backend",
      ],
      /**
       * Sourcemaps for dependencies are rarely needed. Only if debug
       * third-party node_modules, which is uncommon. They will slow down
       * builds/server and use more memory. For Vitest best if dep sourcemaps
       * are off, otherwise on failed test the output can additionally report
       * ENONET for missing sourcemaps, highly misleading when debugging.
       */
      esbuildOptions: {
        sourcemap: false,
      },
    },
  };
});
