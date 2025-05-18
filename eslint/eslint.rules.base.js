/**
 * Base eslint rules only\
 * I.e. not plugins
 */

export const baseRules = {
  "arrow-body-style": ["error", "always"],

  curly: "error",

  "max-lines": [
    "error",
    { max: 450, skipBlankLines: true, skipComments: true },
  ],

  "no-alert": ["error"],

  "no-console": [
    "error",
    {
      allow: ["warn", "error", "time", "timeEnd"],
    },
  ],

  "no-param-reassign": [
    "error",
    {
      ignorePropertyModificationsFor: [
        "acc",
        "accumulator",
        "e",
        "ctx",
        "context",
        "req",
        "request",
        "res",
        "response",
        "$scope",
        "staticContext",
      ],
      props: true,
    },
  ],

  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: [".."],
          message:
            "\nAvoid relative parent imports, use absolute @ alias path.",
        },
        {
          group: ["@mui/material"],
          importNames: ["styled", "css"],
          message: "\nAvoid using MUI styled. Use Tailwind classes instead.",
        },
        {
          group: ["@emotion"],
          importNames: ["default", "css", "styled"],
          message:
            "\nAvoid using styled imports. Use Tailwind classes instead.",
        },
      ],
    },
  ],

  "no-restricted-syntax": [
    "error",
    {
      message:
        "for..in loops iterate over the entire prototype chain. Use Object.{keys|values|entries}, and iterate over the resulting array.",
      selector: "ForInStatement",
    },
    {
      message:
        "iterators/generators require regenerator-runtime. These loops should be avoided in favor of array iterations.",
      selector: "ForOfStatement",
    },
    {
      message:
        "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      selector: "LabeledStatement",
    },
    {
      message:
        "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      selector: "WithStatement",
    },
    {
      selector: "TSEnumDeclaration",
      message:
        "Avoid using `enum`, always prefer standard `const` object or union types.",
    },
    {
      selector: "JSXAttribute[name.name='sx']",
      message: "Avoid using MUI sx prop. Use Tailwind classes instead.",
    },
  ],

  "no-underscore-dangle": "error",

  "no-void": [
    "error",
    {
      allowAsStatement: true,
    },
  ],
  "prefer-template": "error",
};
