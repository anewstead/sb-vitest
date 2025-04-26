/**
 * Plugin for stylelint\
 * Checks if the filename matches the naming convention
 *
 * Default convention: camelCase\
 * This is also lowercase as don't need a capital letter
 *
 * Usage: stylelintrc.json
 *
 * ```json
 * "plugins":["./scripts/cssFileName.js"];
 *
 * "rules": {
 *   "filenames/match-case":["error","camelcase"];
 * }
 * ```
 */

import fs from "node:fs";
import path from "node:path";

import stylelint from "stylelint";

const {
  createPlugin,
  utils: { report, ruleMessages },
} = stylelint;

export const ruleName = "stylelint-filename/match-case";
export const messages = ruleMessages(ruleName, {
  expected: (name, convention, example) => {
    return `Filename "${name}" does not match ${convention} convention. E.g: ${example},
You may need to reload the file after a rename to see the changes in your IDE.
`;
  },
  invalidConvention:
    "Invalid naming convention specified. Available conventions: camelCase, pascalCase",
});

// also allow underscore prefix (scss convention)
const namingConventions = {
  camelCase: /^_?[a-z][a-zA-Z0-9]*$/,
  pascalCase: /^_?[A-Z][a-zA-Z0-9]*$/,
};

const getExample = (convention) => {
  switch (convention) {
    case "pascalCase":
      return "MyFile or Myfile";
    default:
      return "myFile or myfile"; // camelCase
  }
};

const ruleFunction = (primaryOption) => {
  return (postcssRoot, postcssResult) => {
    const convention = primaryOption || "camelCase";
    const regex = namingConventions[convention];

    if (!regex) {
      report({
        message: messages.invalidConvention,
        ruleName,
        result: postcssResult,
        node: postcssRoot,
        index: 0,
        endIndex: 0,
      });
      return;
    }

    const filename = postcssRoot.source.input.from;
    const dir = path.dirname(filename);
    const files = fs.readdirSync(dir);
    const reportedName = path.basename(filename);

    // Find the file case-insensitively
    const actualFile = files.find((f) => {
      return f.toLowerCase() === reportedName.toLowerCase();
    });

    if (!actualFile) {
      // eslint-disable-next-line no-console
      console.log("Debug: File not found in directory:", {
        filename,
        reportedName,
        filesInDir: files,
      });
      return; // File not found, skip check
    }

    // Get the base name (everything before the first dot)
    const name = actualFile.split(".")[0];
    const matchRegex = regex.test(name);

    // log for debugging
    console.log("Debug:", {
      filename,
      reportedName,
      actualFile,
      name,
      convention,
      matches: matchRegex,
      filesInDir: files,
    });

    if (matchRegex) {
      return; // Filename matches convention, no error
    }

    const fileContent = postcssRoot.source.input.css;
    const contentLength = fileContent.length;

    report({
      message: messages.expected(name, convention, getExample(convention)),
      ruleName,
      result: postcssResult,
      node: postcssRoot,
      index: 0,
      endIndex: contentLength,
      code: `filename-${name}`,
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

// eslint-disable-next-line import/no-default-export
export default createPlugin(ruleName, ruleFunction);
