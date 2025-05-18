/**
 * @typescript-eslint rules only
 */

export const tsRules = {
  "@typescript-eslint/ban-ts-comment": [
    "error",
    {
      "ts-check": false,
      "ts-expect-error": "allow-with-description",
      "ts-ignore": "allow-with-description",
      "ts-nocheck": "allow-with-description",
    },
  ],

  "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  "@typescript-eslint/consistent-type-exports": "error",
  "@typescript-eslint/consistent-type-imports": "error",

  "@typescript-eslint/naming-convention": [
    "error",
    {
      format: ["camelCase", "PascalCase", "UPPER_CASE"],
      selector: "variable",
    },
    {
      format: ["camelCase", "PascalCase"],
      selector: "function",
    },
    {
      format: ["PascalCase"],
      selector: "typeLike",
    },
    {
      selector: ["interface", "typeAlias"],
      format: ["PascalCase"],
      custom: {
        regex: "^I[A-Z]",
        match: true,
      },
    },
  ],
};
