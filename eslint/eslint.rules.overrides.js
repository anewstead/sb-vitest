/*
override rules for specific files/folders
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

const allowDevDepImports = {
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

/*
export order may be important.
eslint's final config is a merge of all configs
any duplicate rules in later items will override earlier
*/
export const overrideRules = [
  allowDefaultExport,
  allowDevDepImports,
  allowParentImports,
];
