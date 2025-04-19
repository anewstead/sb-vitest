import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tsEslint from "typescript-eslint";
import json from "eslint-plugin-json";
import vitest from "@vitest/eslint-plugin";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";

import { baseRules } from "./eslint.rules.base.js";
import { importRules } from "./eslint.rules.import.js";
import { tsRules } from "./eslint.rules.typescript.js";

const baseIgnores = {
  ignores: [
    "!**/.storybook/**",
    "**/node_modules/**",
    "**/build/**",
    "**/dist/**",
    "**/public/**",
    "**/.idea/**",
    "**/.DS_Store",
    "**/*.log",
  ],
};

const jsonConfig = {
  files: ["**/*.json"],
  ...json.configs["recommended-with-comments"],
};

/*
testConfig will merge with reactConfig 
due to the file glob
*/
const testConfig = {
  files: ["**/*.test.{ts,tsx}"],
  plugins: {
    vitest: vitest,
  },
  rules: {
    ...vitest.configs.recommended.rules,
    "vitest/prefer-hooks-on-top": "error",
  },
};

/*
storybookConfig will merge with reactConfig
due to the file glob
*/
const storybookConfig = {
  files: ["**/*.stories.{ts,tsx}", ".storybook/**/*.{ts,tsx}"],
  plugins: {
    storybook: storybook,
  },
  rules: {
    ...storybook.configs.recommended.rules,
  },
};

const nodeConfig = {
  files: ["**/*.{js,cjs,mjs}"],
  extends: [js.configs.recommended],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.node,
      ...globals.es2020,
    },
    sourceType: "module",
  },
  plugins: {
    import: importPlugin,
  },
  rules: {
    ...baseRules,
    ...importRules,
  },
};

const reactConfig = {
  files: ["**/*.{ts,tsx}"],
  extends: [
    js.configs.recommended,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: {
    react: react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "jsx-a11y": jsxA11y,
    import: importPlugin,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactRefresh.configs.vite.rules,
    ...reactHooks.configs.recommended.rules,
    ...jsxA11y.configs.recommended.rules,
    ...baseRules,
    ...importRules,
    ...tsRules,
  },
};

export default tsEslint.config(
  baseIgnores,
  nodeConfig,
  jsonConfig,
  reactConfig,
  testConfig,
  storybookConfig,
  prettier
);
