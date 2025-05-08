/**
 * @eslint-plugin-check-file rules only
 */

const blockListErrorMsg = `Incorrect filename: {{ target }}
  a) opposite pluralise file.middlename
  b) test.tsx > test.ts
  c) stories.ts > stories.tsx
  d) file.component not allowed
`;

export const checkFileRules = {
  // filename-blocklist
  // mostly about singular middle extensions
  "check-file/filename-blocklist": [
    "error",
    {
      // should be singular
      "**/*.configs.*": "*.config.*",
      "**/*.constants.*": "*.const.*",
      "**/*.consts.*": "*.const.*",
      "**/*.examples.*": "*.example.*",
      "**/*.helpers.*": "*.helper.*",
      "**/*.hooks.*": "*.hook.*",
      "**/*.mocks.*": "*.mock.*",
      "**/*.models.*": "*.model.*",
      "**/*.services.*": "*.service.*",
      "**/*.setups.*": "*.setup.*",
      "**/*.specs.*": "*.spec.*",
      "**/*.stores.*": "*.store.*",
      "**/*.states.*": "*.state.*",
      "**/*.styles.*": "*.style.*",
      "**/*.tests.*": "*.test.*",
      "**/*.types.*": "*.type.*",
      "**/*.utils.*": "*.util.*",
      "**/*.workspaces.*": "*.workspace.*",

      // should be plural
      "**/*.rule.*": "*.rules.*",
      "**/*.story.*": "*.stories.*",

      // should be file type
      "**/*.component.*": "*.*",
      "**/*.stories.ts": "*.stories.tsx",
      "**/*.test.tsx": "*.test.ts",
    },
    {
      errorMessage: blockListErrorMsg,
    },
  ],

  // filename-naming-convention
  // default camelCase
  // jsx tsx are PascalCase because of react requirement
  "check-file/filename-naming-convention": [
    "error",
    {
      "**/*.{js,ts}": "CAMEL_CASE",
      "**/*.{jsx,tsx}": "PASCAL_CASE",
    },
    { ignoreMiddleExtensions: true },
  ],

  // folder-naming-convention
  // default camelCase because just simpler to have same general convention
  "check-file/folder-naming-convention": [
    "error",
    { "/**/!(__{tests,mocks}__|@*)/**/": "CAMEL_CASE" },
  ],

  "check-file/no-index": "error",
};
