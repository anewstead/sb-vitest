/**
 * Override rules for specific files/folders
 */

const allowDefaultExport = {
  files: [
    "./*",
    ".storybook/**/*",
    "**/eslint/**",
    "src/**/*.stories.tsx",
    "code_template/**/*.stories.tsx",
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
    "src/common/test/**",
    "**/eslint**",
    "**/__tests__/**",
    "**/__mocks__/**",
    "**/*.{test,mock,stories}.{js,jsx,ts,tsx}",
  ],
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-unassigned-import": "off",
  },
};

const allowParentImports = {
  files: ["**/__{tests,mocks}__/**", ".storybook/**/*"],
  rules: {
    "no-restricted-imports": [
      "error",
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
 * Redux Toolkit allows mutating param-reassign in reducers via Immer library.
 */
const allowOnlyInState = {
  files: ["src/app/state/**"],
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

const allowOnlyInTest = {
  files: ["src/**/*.stories.tsx", "src/**/*.test.ts"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
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
  allowOnlyInState,
  allowOnlyInTest,
];
