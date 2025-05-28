import { expect, within } from "@storybook/test";

import { ThemeControls } from "./ThemeControls";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: set ONLY meta.component here
*/
const meta = {
  component: ThemeControls,
} satisfies Meta<typeof ThemeControls>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play function here
*/
const base: IStory = {
  args: {},
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);

    const lightButton = canvas.getByRole("button", { name: /light/i });
    await expect(lightButton).toBeVisible();

    const themeSelect = canvas.getByLabelText("Theme");
    await expect(themeSelect).toBeVisible();
  },
};
