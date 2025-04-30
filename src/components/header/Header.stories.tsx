import { fn } from "@storybook/test";

import { Header } from "./Header";

import type { Meta, StoryObj } from "@storybook/react";

/**
 * Meta: ONLY set meta.component
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
    welcomeText: "Welcome",
    loginText: "Log in",
    logoutText: "Log out",
    signupText: "Sign up",
  },
};

/**
 * Stories: merge over base.\
 * TS requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const LoggedOut: Story = base;

export const LoggedIn: Story = {
  args: {
    ...base.args,
    user: {
      name: "Jane Doe",
    },
  },
};
