/*
eslint-plugin-import based rules only 

import/order should result in:
1. css > scss > unknown
2. react > other classes
3. react types > other types
THE PLUGIN DOES NOT AUTOFIX UNASSIGNED IMPORTS
e.g. import "myFile.css"
unnamed imports may have side effects where sort order is relevant
preferred placement is first and suggested in lint warning
but they will need to be moved manually
suggest if you need a position other than preferred that
also add a eslint-disable-next-line import/order comment
*/

export const importRules = {
  "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  "import/no-default-export": "error",
  "import/no-extraneous-dependencies": [
    "warn",
    {
      devDependencies: [
        "./*",
        ".storybook/**",
        "scripts/**",
        "src/testing/**",
        "**/__tests__/**",
        "**/__mocks__/**",
        "**/*.{test,mock,stories}.{js,jsx,ts,tsx}",
      ],
    },
  ],
  "import/no-unassigned-import": ["warn", { allow: ["**/*.css"] }],

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
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index",
        "object",
        "type",
        "unknown",
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
        // {
        //   group: "unknown",
        //   pattern: "*.css",
        //   position: "before",
        //   patternOptions: { matchBase: true },
        // },
        // {
        //   group: "unknown",
        //   pattern: "*.scss",
        //   position: "before",
        //   patternOptions: { matchBase: true },
        // },
      ],
      pathGroupsExcludedImportTypes: [
        "react+(|-native)",
        "type",
        // "*.css",
        // "*.scss",
      ],
      warnOnUnassignedImports: true,
    },
  ],

  "import/prefer-default-export": "off",
};
