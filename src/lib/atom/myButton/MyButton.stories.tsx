import { fn } from "@storybook/test";
import { deepmerge } from "deepmerge-ts";

import { MyButton } from "./MyButton";

import type { Meta, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta = {
  component: MyButton,
} satisfies Meta<typeof MyButton>;
export default meta;
type IStory = StoryObj<typeof meta>;

// Base: default story props. NO play functions
const base: IStory = {
  args: {
    label: "Button",
    onClick: fn(),
  },
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const Primary: IStory = base;

export const Secondary: IStory = deepmerge(base, {
  args: {
    ...base.args,
    secondary: true,
  },
});

export const Large: IStory = deepmerge(base, {
  args: {
    ...base.args,
    size: "large" as const,
  },
});

export const Small: IStory = deepmerge(base, {
  args: {
    ...base.args,
    size: "small" as const,
  },
});
