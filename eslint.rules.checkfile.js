/*
@typescript-eslint rules only
*/

export const checkFileRules = {
  "check-file/filename-naming-convention": [
    "error",
    {
      "src/**/*.{jsx,tsx}": "PASCAL_CASE",
      "src/**/*.{js,ts,css,scss}": "CAMEL_CASE",
    },
    { ignoreMiddleExtensions: true },
  ],

  "check-file/folder-naming-convention": [
    "error",
    { "src/**/!(__{tests,mocks}__|@*)/": "CAMEL_CASE" },
  ],

  "check-file/no-index": "error",
};
