/**
 * Override rules for specific files/folders
 */

const allowDefaultExport = {
  files: [
    "./*",
    ".storybook/**/*",
    "**/eslint/**",
    "src/**/*.stories.{ts,tsx}",
  ],
  rules: {
    "import/no-default-export": "off",
  },
};

const allowRelaxedImports = {
  files: [
    "./*",
    ".storybook/**",
    "scripts/**",
    "src/test/**",
    "**/eslint**",
    "**/__tests__/**",
    "**/__mocks__/**",
    "**/*.{test,mock,stories}.{js,jsx,ts,tsx}",
  ],
  rules: {
    "import/no-extraneous-dependencies": ["warn", { devDependencies: true }],
    "import/no-unassigned-import": "off",
  },
};

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

/**
 * Should only really be for state. Redux Toolkit allows mutating logic for
 * state in reducers via Immer library. so we allow no-param-reassign
 * specifically for state property in this folder
 */
const allowParamReassign = {
  files: ["src/state/**"],
  rules: {
    "no-param-reassign": [
      "error",
      {
        ignorePropertyModificationsFor: ["state"],
        props: true,
      },
    ],
  },
};

/**
 * Order may be important\
 * Eslint's final config is a merge of all configs\
 * Any duplicate rules in later items will override earlier
 */
export const overrideRules = [
  allowDefaultExport,
  allowRelaxedImports,
  allowParentImports,
  allowParamReassign,
];
