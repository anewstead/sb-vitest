import { expect, within } from "@storybook/test";

import { selectMuiOption } from "@src/common/test/utils/selectMuiOption";

import { ThemeSelector } from "./ThemeSelector";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: ThemeSelector,
} satisfies Meta<typeof ThemeSelector>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {},
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);

    // Verify initial theme is blue
    const themeDisplay = canvas.getByTestId("theme-display");
    await expect(themeDisplay).toHaveTextContent("blue");

    // Select green theme using utility function
    const themeSelect = canvas.getByLabelText("Theme");
    await selectMuiOption(themeSelect, "Green");

    // Verify the theme has changed
    await expect(themeDisplay).toHaveTextContent("green");
  },
};
