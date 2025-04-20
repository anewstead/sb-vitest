import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import json from "eslint-plugin-json";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tsEslint from "typescript-eslint";

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

const nodeConfig = {
  files: ["**/*.{js,cjs,mjs}"],
  extends: [js.configs.recommended],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.node,
    },
  },
  rules: {
    ...baseRules,
  },
};

const reactConfig = {
  files: ["src/**/*.{ts,tsx}"],
  extends: [
    js.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
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
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: {
    react: react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "jsx-a11y": jsxA11y,
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

const testConfig = {
  files: ["src/**/*.test.{ts,tsx}"],
  plugins: {
    vitest: vitest,
  },
  rules: {
    ...vitest.configs.recommended.rules,
    "vitest/prefer-hooks-on-top": "error",
  },
};

const storiesConfig = {
  files: ["src/**/*.stories.{ts,tsx}"],
  plugins: {
    storybook: storybook,
  },
  extends: [storybook.configs["flat/recommended"]],
  rules: {
    "storybook/use-storybook-expect": "off",
  },
};

const allowDefaultExport = {
  files: ["./*", ".storybook/**/*", "src/**/*.stories.{ts,tsx}"],
  rules: {
    "import/no-default-export": "off",
  },
};

export default tsEslint.config(
  baseIgnores,
  jsonConfig,
  nodeConfig,
  reactConfig,
  testConfig,
  storiesConfig,
  allowDefaultExport,
  prettier
);
