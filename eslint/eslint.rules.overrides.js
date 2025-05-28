/**
 * Override rules for specific files/folders
 */

const allowDefaultExport = {
  files: [
    ".storybook/**/*",
    "eslint/**/*",
    "**/*.stories.tsx",
    "**/*.config.*",
    "**/*.workspace.*",
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
    "eslint**",
    "**/__tests__/**",
    "**/__mocks__/**",
    "**/*.{test,mock,stories}.{js,jsx,ts,tsx}",
  ],
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-unassigned-import": "off",
  },
};

/**
 * Redux Toolkit allows mutating param-reassign in reducers via Immer library.
 */
const allowOnlyInState = {
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

const allowOnlyInTest = {
  files: ["**/*.stories.tsx", "**/*.test.ts"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};

const allowFolderNaming = {
  files: ["**/__tests__/**", "**/__mocks__/**"],
  rules: {
    "check-file/folder-naming-convention": "off",
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
  allowOnlyInState,
  allowOnlyInTest,
  allowFolderNaming,
];
