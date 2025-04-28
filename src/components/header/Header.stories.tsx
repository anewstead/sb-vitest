import { fn } from "@storybook/test";
import { deepmerge } from "deepmerge-ts";

import { Header } from "./Header";

import type { Meta, StoryObj } from "@storybook/react";

/**
 * Meta: set component type only
 */
const meta = {
  component: Header,
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base: default story props
 */
const base: Story = {
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

/**
 * Stories: merge over base.\
 * TS requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const LoggedOut: Story = deepmerge(base, {});

export const LoggedIn: Story = deepmerge(base, {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
});
