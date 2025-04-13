import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import json from "eslint-plugin-json";
import vitest from "@vitest/eslint-plugin";

const baseIgnores = {
  ignores: [
    "eslint.config.js",
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.vscode/**",
    "**/.idea/**",
    "**/*.log",
    "**/.DS_Store",
    "!**/.storybook/**",
  ],
};

const jsonConfig = {
  files: ["**/*.json"],
  ...json.configs["recommended-with-comments"],
};

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

const reactConfig = {
  files: ["src/**/*.{ts,tsx}"],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
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
    storybook: storybook,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactRefresh.configs.vite.rules,
    ...reactHooks.configs.recommended.rules,
    ...jsxA11y.configs.recommended.rules,
    ...storybook.configs.recommended.rules,
  },
};

export default tseslint.config(
  baseIgnores,
  jsonConfig,
  testConfig,
  reactConfig
);
