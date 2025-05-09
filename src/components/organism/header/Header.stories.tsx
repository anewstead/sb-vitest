import { fn } from "@storybook/test";

import { Header } from "./Header";

import type { Meta, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta = {
  component: Header,
} satisfies Meta<typeof Header>;
export default meta;
type IStory = StoryObj<typeof meta>;

// Base: default story props
const base: IStory = {
  args: {
    loginBarProps: {
      onLogin: fn(),
      onLogout: fn(),
      onCreateAccount: fn(),
      welcomeText: "Welcomex",
      loginText: "Log inx",
      logoutText: "Log outx",
      signupText: "Sign upx",
    },
  },
};

/**
 * Stories: merge over base.\
 * TS requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const Default: IStory = base;
