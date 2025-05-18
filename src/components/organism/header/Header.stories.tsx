import { fn } from "@storybook/test";

import { Header } from "./Header";

import type { Meta, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: Header,
} satisfies Meta<typeof Header>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  argTypes: {
    loginBarProps: {
      control: false, // hide in browser
    },
  },
  args: {
    loginBarProps: {
      user: {
        name: "Jane Doe",
      },
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

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = base;
