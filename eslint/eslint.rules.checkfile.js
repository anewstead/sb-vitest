/**
 * @eslint-plugin-check-file rules only
 */

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
      "**/*.functions.*": "*.function.*",
      "**/*.funcs.*": "*.function.*",
      "**/*.helpers.*": "*.helper.*",
      "**/*.hooks.*": "*.hook.*",
      "**/*.mocks.*": "*.mock.*",
      "**/*.models.*": "*.model.*",
      "**/*.services.*": "*.service.*",
      "**/*.setups.*": "*.setup.*",
      "**/*.specs.*": "*.spec.*",
      "**/*.stores.*": "*.store.*",
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
      errorMessage: 'Incorrect filename: A should be B -> "{{ target }}";',
    },
  ],

  // filename-naming-convention
  // default camelCase
  // jsx tsx are PascalCase
  "check-file/filename-naming-convention": [
    "error",
    {
      "**/*.{js,ts}": "CAMEL_CASE",
      "**/*.{jsx,tsx}": "PASCAL_CASE",
    },
    { ignoreMiddleExtensions: true },
  ],

  // folder-naming-convention
  // default kebab-case because they should be url-like
  "check-file/folder-naming-convention": [
    "error",
    { "/**/!(__{tests,mocks}__|@*)/**/": "KEBAB_CASE" },
  ],

  "check-file/no-index": "error",
};
