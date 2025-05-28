import eslintJs from "@eslint/js";
import vitestPlugin from "@vitest/eslint-plugin";
import prettierConfig from "eslint-config-prettier/flat";
import checkFilePlugin from "eslint-plugin-check-file";
import importPlugin from "eslint-plugin-import";
import jsonPlugin from "eslint-plugin-json";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import storybookPlugin from "eslint-plugin-storybook";
import globals from "globals";
import tsEslint from "typescript-eslint";

import { baseRules } from "./eslint.rules.base.js";
import { checkFileRules } from "./eslint.rules.checkfile.js";
import { importRules } from "./eslint.rules.import.js";
import { overrideRules } from "./eslint.rules.overrides.js";
import { tsRules } from "./eslint.rules.typescript.js";
import { storybookPlayPlugin } from "./eslint.storybook.playPlugin.js";

/**
 * The eslint config\
 * Layers up config from base js -> tsx and more\
 * Generally we use recommended configs from plugins,\
 * And only override where necessary,\
 * Where there are more than just a couple of additional rules added\
 * They are moved to a separate file to help keep this file clean
 */

// lint ignores
const baseIgnores = {
  ignores: [
    ".husky/**",
    "**/.idea/**",
    "**/.DS_Store",
    "**/node_modules/**",
    "**/build/**",
    "**/dist/**",
    "**/public/**",
    "**/public-sb/**",
    "**/vendor/**",
    "**/generated/**",
    "**/coverage/**",
    "**/storybook-static/**",
    "!**/.storybook/**",
  ],
};

// applies to all json files
const jsonConfig = {
  files: ["**/*.json"],
  ...jsonPlugin.configs["recommended-with-comments"],
};

// applies to all script files
const baseConfig = {
  extends: [eslintJs.configs.recommended, importPlugin.flatConfigs.recommended],
  plugins: {
    "check-file": checkFilePlugin,
  },
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.node,
    },
  },
  settings: {
    "import/ignore": ["node_modules"],
    "import/resolver": {
      typescript: true,
    },
  },
  rules: {
    ...baseRules,
    ...importRules,
    ...checkFileRules,
  },
};

// builds on baseConfig
const tsConfig = {
  files: ["**/*.{ts,tsx}"],
  extends: [
    importPlugin.flatConfigs.typescript,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.json"],
    },
  },
  rules: {
    ...tsRules,
  },
};

// builds on tsConfig
const reactConfig = {
  files: ["src/**/*.{ts,tsx}"],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: {
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
    "react-refresh": reactRefreshPlugin,
    "jsx-a11y": jsxA11yPlugin,
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactRefreshPlugin.configs.vite.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...jsxA11yPlugin.configs.recommended.rules,
  },
};

// builds on tsConfig
const testConfig = {
  files: ["**/*.test.ts", "**/*.spec.{js,ts}"],
  plugins: {
    vitest: vitestPlugin,
  },
  rules: {
    ...vitestPlugin.configs.recommended.rules,
    "vitest/prefer-hooks-on-top": "error",
  },
};

// builds on reactConfig
const storiesConfig = {
  files: ["**/*.stories.tsx"],
  plugins: {
    storybook: storybookPlugin,
    "storybook-play": storybookPlayPlugin,
  },
  extends: [storybookPlugin.configs["flat/recommended"]],
  rules: {
    "storybook-play/require-play-test": "error",
  },
};

// override eslint-config-prettier if has unwanted conflicts
const prettierOverride = {
  rules: {
    curly: "error",
  },
};

/**
 * The order of the configs is important.\
 * Addition/override must apply in correct order as\
 * Eslint's final config is a merge of all configs\
 * Any duplicate rules in later items will override earlier\
 * E.g you can have a general rule and override it for specific cases
 */
export default tsEslint.config(
  baseIgnores,
  jsonConfig,
  baseConfig,
  tsConfig,
  testConfig,
  reactConfig,
  storiesConfig,
  ...overrideRules,
  prettierConfig,
  prettierOverride
);
