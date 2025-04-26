/**
 * Setup for components.tsx which all test via .stories.tsx\
 * Functional files are .ts and test via .test.ts files\
 * See also root/vitest.setup.ts
 */

// setProjectAnnotations is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations

import { setProjectAnnotations } from "@storybook/react";
import { configure } from "@storybook/test";
import { beforeAll } from "vitest";

import * as projectAnnotations from "./preview";
// import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";

// Configure Storybook testing-library to remove DOM dump verbosity
configure({
  testIdAttribute: "data-testid",
  asyncUtilTimeout: 1000,
  getElementError: (message) => {
    const error = new Error(message ?? "Element not found");
    error.name = "TestingLibraryElementError";
    return error;
  },
});

const project = setProjectAnnotations([
  // a11yAddonAnnotations,
  projectAnnotations,
]);

beforeAll(() => {
  project.beforeAll();
});
