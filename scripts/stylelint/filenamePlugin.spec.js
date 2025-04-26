import fs from "node:fs";
import path from "node:path";

import stylelint from "stylelint";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

import { ruleName } from "./filenamePlugin.js";

const testDir = path.join(process.cwd(), "test-files");

const FILENAME_PLUGIN = "./scripts/stylelint/filenamePlugin.js";
const INVALID_CONVENTION_MESSAGE = "Invalid naming convention";

const testCases = [
  {
    convention: "camelCase",
    valid: "myFile.module.css",
    invalid: "MyFile.module.css",
  },
  {
    convention: "pascalCase",
    valid: "MyFile.module.css",
    invalid: "myFile.module.css",
  },
];

const cleanupFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const cleanupDir = () => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
};

const createDir = () => {
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }
};

const runLintTest = async (filename, convention) => {
  const filePath = path.join(testDir, filename);
  cleanupFile(filePath);
  fs.writeFileSync(filePath, "");

  const result = await stylelint.lint({
    files: [filePath],
    config: {
      plugins: [FILENAME_PLUGIN],
      rules: {
        [ruleName]: convention,
      },
    },
  });

  return result.results[0];
};

describe("filenamePlugin", () => {
  beforeAll(() => {
    createDir();
  });

  afterAll(() => {
    cleanupDir();
  });

  test.each(testCases)(
    "$convention convention",
    async ({ convention, valid, invalid }) => {
      const validResult = await runLintTest(valid, convention);
      expect(validResult.warnings).toHaveLength(0);

      const invalidResult = await runLintTest(invalid, convention);
      expect(invalidResult.warnings).toHaveLength(1);
      expect(invalidResult.warnings[0].text).toContain(convention);
    }
  );

  it("defaults to camelCase when no convention is specified", async () => {
    const result = await runLintTest("MyFile.module.css", "camelCase");
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].text).toContain("camelCase");
  });

  it("reports error for invalid convention", async () => {
    const result = await runLintTest("myFile.module.css", "invalidConvention");
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].text).toContain(INVALID_CONVENTION_MESSAGE);
  });
});
