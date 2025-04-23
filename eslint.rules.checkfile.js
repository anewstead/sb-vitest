/*
@eslint-plugin-check-file rules only


*/

export const checkFileRules = {
  // filename-blocklist
  // mostly about singular middle extensions
  "check-file/filename-blocklist": [
    "error",
    {
      // should be singular
      "**/*.models.*": "*.model.*",
      "**/*.utils.*": "*.util.*",
      "**/*.helpers.*": "*.helper.*",
      "**/*.functions.*": "*.function.*",
      "**/*.funcs.*": "*.function.*",
      "**/*.hooks.*": "*.hook.*",
      "**/*.types.*": "*.type.*",
      "**/*.constants.*": "*.const.*",
      "**/*.consts.*": "*.const.*",
      "**/*.services.*": "*.service.*",
      "**/*.stores.*": "*.store.*",
      "**/*.styles.*": "*.style.*",
      "**/*.tests.*": "*.test.*",
      "**/*.mocks.*": "*.mock.*",
      "**/*.workspaces.*": "*.workspace.*",
      "**/*.configs.*": "*.config.*",
      "**/*.examples.*": "*.example.*",
      "**/*.setups.*": "*.setup.*",

      // should be plural
      "**/*.rule.*": "*.rules.*",
      "**/*.story.*": "*.stories.*",
    },
    {
      errorMessage:
        'Single/Plural middle extension name "{{ target }}" incorrect, should be opposite!"',
    },
  ],

  // filename-naming-convention
  // default camelCase
  // jsx tsx are PascalCase
  "check-file/filename-naming-convention": [
    "error",
    {
      "src/**/*.{js,ts}": "CAMEL_CASE",
      "src/**/*.{jsx,tsx}": "PASCAL_CASE",
    },
    { ignoreMiddleExtensions: true },
  ],

  // folder-naming-convention
  // default camelCase
  "check-file/folder-naming-convention": [
    "error",
    { "src/**/!(__{tests,mocks}__|@*)/": "CAMEL_CASE" },
  ],

  "check-file/no-index": "error",
};
