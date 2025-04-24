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

import { baseRules } from "./eslint/eslint.rules.base.js";
import { checkFileRules } from "./eslint/eslint.rules.checkfile.js";
import { importRules } from "./eslint/eslint.rules.import.js";
import { tsRules } from "./eslint/eslint.rules.typescript.js";

/*
The eslint config
layers up config from base js -> tsx and more
generally we use recommended configs from plugins, 
and only override where necessary,
where there are more than just a couple of additional rules added
they are moved to a separate file to help keep this file clean 
*/

// applies to all json files
const jsonConfig = {
  files: ["**/*.json"],
  ...jsonPlugin.configs["recommended-with-comments"],
};

// lint ignores
const baseIgnores = {
  ignores: [
    "!**/.storybook/**",
    "**/.storybook/static/**",
    "**/storybook-static/**",
    "**/node_modules/**",
    "**/build/**",
    "**/dist/**",
    "**/public/**",
    "**/vendor/**",
    "**/generated/**",
    "**/.idea/**",
    "**/.DS_Store",
    "**/*.log",
  ],
};

// applies to all script files
// js,jsx,ts,tsx,mjs,cjs
const baseConfig = {
  extends: [
    eslintJs.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
  ],
  plugins: {
    "check-file": checkFilePlugin,
  },
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    globals: {
      ...globals.node,
    },
  },
  settings: {
    "import/ignore": ["node_modules"],
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    ...baseRules,
    ...importRules,
    ...checkFileRules,
  },
};

// builds on baseConfig
// applies to all ts/tsx files
const tsConfig = {
  files: ["**/*.{ts,tsx}"],
  extends: [
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    ...tsRules,
  },
};

// builds on tsConfig
// applies to src react files
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

// builds on reactConfig
// applies to src test files
const testConfig = {
  files: ["src/**/*.test.{ts,tsx}"],
  plugins: {
    vitest: vitestPlugin,
  },
  rules: {
    ...vitestPlugin.configs.recommended.rules,
    "vitest/prefer-hooks-on-top": "error",
  },
};

// builds on reactConfig
// applies to src storybook files
const storiesConfig = {
  files: ["src/**/*.stories.{ts,tsx}"],
  plugins: {
    storybook: storybookPlugin,
  },
  extends: [storybookPlugin.configs["flat/recommended"]],
  rules: {
    "storybook/use-storybook-expect": "off",
  },
};

// override
const allowParentImports = {
  files: ["**/__{tests,mocks}__/**", ".storybook/**/*"],
  rules: {
    "no-restricted-imports": [
      "warn",
      {
        patterns: [
          {
            group: ["../.."],
            message:
              "Folder allows 1 level relative parent import, otherwise use absolute @ alias path.",
          },
        ],
      },
    ],
  },
};

// override
const allowDefaultExport = {
  files: ["./*", ".storybook/**/*", "src/**/*.stories.{ts,tsx}"],
  rules: {
    "import/no-default-export": "off",
  },
};

/*
the order of the configs is important.
each config is merged into a final config
overrides/additions must apply in correct order
*/
export default tsEslint.config(
  jsonConfig,
  baseIgnores,
  baseConfig,
  tsConfig,
  reactConfig,
  testConfig,
  storiesConfig,
  allowDefaultExport,
  allowParentImports,
  prettierConfig
);
