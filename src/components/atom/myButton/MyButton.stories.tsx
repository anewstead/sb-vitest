import { expect, fn, within } from "@storybook/test";

import { MyButton } from "./MyButton";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: MyButton,
} satisfies Meta<typeof MyButton>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    label: "Button",
    onClick: fn(),
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Primary: IStory = {
  ...base,
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: args.label });
    button.click();
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Secondary: IStory = {
  ...base,
  args: {
    ...base.args,
    secondary: true,
  },
};

export const Large: IStory = {
  ...base,
  args: {
    ...base.args,
    size: "large" as const,
  },
};

export const Small: IStory = {
  ...base,
  args: {
    ...base.args,
    size: "small" as const,
  },
};
