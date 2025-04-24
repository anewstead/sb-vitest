/*
base eslint rules only
i.e. not plugins
*/

export const baseRules = {
  "arrow-body-style": ["error", "always"],
  curly: "error",
  "no-alert": ["warn"],

  "no-console": [
    "warn",
    {
      allow: ["warn", "error", "info", "dir", "time", "timeEnd"],
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
    "warn",
    {
      patterns: [
        {
          group: [".."],
          message: "Avoid relative parent imports, use absolute @ alias path.",
        },
      ],
    },
  ],

  "no-restricted-syntax": [
    "error",
    {
      message:
        "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      selector: "ForInStatement",
    },
    {
      message:
        "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.",
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
  ],

  "no-underscore-dangle": "warn",

  "no-void": [
    "error",
    {
      allowAsStatement: true,
    },
  ],
  "prefer-template": "error",
};
