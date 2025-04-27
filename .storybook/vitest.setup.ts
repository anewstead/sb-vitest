/**
 * Setup for components.tsx which all test via .stories.tsx\
 * Functional files are .ts and test via .test.ts files\
 * See also root/vitest.setup.ts
 */

import { setProjectAnnotations } from "@storybook/react";
import { configure } from "@storybook/test";
import { afterEach, beforeAll } from "vitest";

import * as projectAnnotations from "./preview";

import type { TestContext } from "vitest";

/**
 * SetProjectAnnotations is important to apply configuration for story tests.
 * https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
 */
const project = setProjectAnnotations([projectAnnotations]);

/**
 * Remove the debug link from the error message. We do this as the link will
 * never work as the local server is closed once test run is complete and is a
 * distraction to debugging.
 */
const removeStorybookDebugLink = (task: TestContext["task"]) => {
  const error = task.result?.errors?.[0];
  if (error) {
    // disable lint as need to include ANSI color codes
    // eslint-disable-next-line no-control-regex
    const DEBUG_LINK_REGEX = /\n\x1B\[34mClick to debug.*?\x1B\[39m\n\n/s;
    error.message = error.message.replace(DEBUG_LINK_REGEX, "");
  }
};

/**
 * Configure Storybook (testing-library)\
 * Remove DOM dump verbosity from failed test error messages
 */
configure({
  testIdAttribute: "data-testid",
  asyncUtilTimeout: 2000,
  getElementError: (message) => {
    const error = new Error(message ?? "Element not found");
    error.name = "TestingLibraryElementError";
    return error;
  },
});

beforeAll(() => {
  project.beforeAll();
});

afterEach(({ task }) => {
  removeStorybookDebugLink(task);
});
