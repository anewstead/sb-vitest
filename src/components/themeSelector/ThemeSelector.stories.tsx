import { ThemeSelector } from "./ThemeSelector";

import type { Meta, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta = {
  component: ThemeSelector,
} satisfies Meta<typeof ThemeSelector>;
export default meta;
type Story = StoryObj<typeof meta>;

// Base: default story props
const base: Story = {
  args: {},
};

/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const Default: Story = base;
