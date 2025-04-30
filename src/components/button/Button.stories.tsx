import { fn } from "@storybook/test";
import { deepmerge } from "deepmerge-ts";

import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

/**
 * Meta: ONLY set meta.component
 */
const meta = {
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base: default story props
 */
const base: Story = {
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
export const Primary: Story = base;

export const Secondary: Story = deepmerge(base, {
  args: {
    ...base.args,
    secondary: true,
  },
});

export const Large: Story = deepmerge(base, {
  args: {
    ...base.args,
    size: "large" as const,
  },
});

export const Small: Story = deepmerge(base, {
  args: {
    ...base.args,
    size: "small" as const,
  },
});
