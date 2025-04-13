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
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";

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

const importOrderRules = {
  ...importPlugin.configs.recommended.rules,
  "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  "import/no-default-export": "error",
  "import/no-unassigned-import": ["warn", { allow: ["**/*.css"] }],
  "import/no-extraneous-dependencies": "off",

  /*
    import/order should result in:
    1. css > scss > unknown
    2. react > the rest!
    3. react types > other types
    THE PLUGIN DOES NOT AUTOFIX UNASSIGNED IMPORTS
    e.g. import "myFile.css"
    its assumes unnamed imports have side effects
    where import position may be relevant
    preferred placement is suggested in a lint warning
    but will need to be moved manually
    css/scss imports should be able to be wherever required
    */

  "import/order": [
    "warn",
    {
      alphabetize: {
        caseInsensitive: true,
        order: "asc",
      },
      named: true,
      distinctGroup: true,
      groups: [
        "unknown",
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index",
        "object",
        "type",
      ],
      "newlines-between": "always",
      pathGroups: [
        {
          group: "external",
          pattern: "react+(|-native)",
          position: "before",
        },
        {
          group: "type",
          pattern: "react+(|-native)",
          position: "after",
        },
        {
          group: "unknown",
          pattern: "*.css",
          position: "before",
          patternOptions: { matchBase: true },
        },
        {
          group: "unknown",
          pattern: "*.scss",
          position: "before",
          patternOptions: { matchBase: true },
        },
      ],
      pathGroupsExcludedImportTypes: [
        "react+(|-native)",
        "type",
        "*.css",
        "*.scss",
      ],
      warnOnUnassignedImports: true,
    },
  ],
  "import/prefer-default-export": "off",
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
    storybook: storybook,
    import: importPlugin,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactRefresh.configs.vite.rules,
    ...reactHooks.configs.recommended.rules,
    ...jsxA11y.configs.recommended.rules,
    ...storybook.configs.recommended.rules,
    ...importOrderRules,
  },
};

export default tseslint.config(
  baseIgnores,
  jsonConfig,
  testConfig,
  reactConfig,
  prettier
);
