import { expect, fn, userEvent, within } from "@storybook/test";

import { ComponentName } from "./ComponentName";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: ComponentName,
} satisfies Meta<typeof ComponentName>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    exampleText: "example text",
    exampleFunction: fn(),
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = base;

export const Other: IStory = {
  ...base,
  args: {
    ...base.args,
    exampleText: "another example text",
  },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(base.args.exampleFunction).toHaveBeenCalled();
  },
};
