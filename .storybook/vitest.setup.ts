/*
setup for components.tsx which all test via .stories.tsx
functional files are .ts and test via .test.ts files
see also root/vitest.setup.ts
*/

// setProjectAnnotations is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations

import { setProjectAnnotations } from "@storybook/react";
import { beforeAll } from "vitest";

import * as projectAnnotations from "./preview";
// import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";

const project = setProjectAnnotations([
  // a11yAddonAnnotations,
  projectAnnotations,
]);

beforeAll(() => {
  project.beforeAll();
});
