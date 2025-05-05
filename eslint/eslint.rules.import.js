/**
 * Eslint-plugin-import based rules only
 *
 * Import/order should result in:\
 *
 * 1. React > other classes
 * 2. React types > other types
 * 3. Css > scss > unknown
 *
 * The plugin does not auto-fix unassigned imports\
 * E.g. import "myFile.css"\
 * Unnamed imports may have side effects where sort order is relevant\
 * Preferred placement is first and suggested in lint warning\
 * But they will need to be moved manually\
 * Suggest if you need a position other than preferred that\
 * Also add a eslint-disable-next-line import/order comment
 */

export const importRules = {
  "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  "import/no-default-export": "error",
  "import/no-extraneous-dependencies": "warn",
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
        "unknown",
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
