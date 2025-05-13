import { fn } from "@storybook/test";

import { MyButton } from "./MyButton";

import type { Meta, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: MyButton,
} satisfies Meta<typeof MyButton>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    label: "Button",
    onClick: fn(),
  },
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Primary: IStory = base;

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
