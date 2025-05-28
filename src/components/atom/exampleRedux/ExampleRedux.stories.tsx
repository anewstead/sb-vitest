import { expect, fn, within } from "@storybook/test";

import { ExampleRedux } from "./ExampleSection";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: set ONLY meta.component here
*/
const meta = {
  component: ExampleRedux,
} satisfies Meta<typeof ExampleRedux>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play function here
*/
const base: IStory = {
  args: {
    exampleText: "This is an example text",
    buttonLabel: "Change Text",
    onChangeText: fn(),
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: args.buttonLabel });
    button.click();
    await expect(args.onChangeText).toHaveBeenCalled();
  },
};
