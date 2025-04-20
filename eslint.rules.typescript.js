/*
@typescript-eslint rules only
*/

export const tsRules = {
  "@typescript-eslint/ban-ts-comment": [
    "warn",
    {
      "ts-check": false,
      "ts-expect-error": "allow-with-description",
      "ts-ignore": "allow-with-description",
      "ts-nocheck": "allow-with-description",
    },
  ],

  "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
  "@typescript-eslint/consistent-type-exports": "error",
  "@typescript-eslint/consistent-type-imports": "error",

  "@typescript-eslint/naming-convention": [
    "warn",
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
  ],

  "@typescript-eslint/no-unsafe-argument": "warn",
  "@typescript-eslint/no-unsafe-assignment": "warn",
  "@typescript-eslint/no-unsafe-call": "warn",
  "@typescript-eslint/no-unsafe-return": "warn",
  "@typescript-eslint/no-unsafe-member-access": "warn",
  "@typescript-eslint/no-unsafe-enum-comparison": "warn",
  "@typescript-eslint/no-non-null-assertion": "warn",
};
