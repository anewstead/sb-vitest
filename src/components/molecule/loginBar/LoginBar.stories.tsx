import { fn } from "@storybook/test";

import { LoginBar } from "./LoginBar";

import type { Meta, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: LoginBar,
} satisfies Meta<typeof LoginBar>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
    welcomeText: "xWelcome",
    loginText: "xLog in",
    logoutText: "xLog out",
    signupText: "xSign up",
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const LoggedOut: IStory = base;

export const LoggedIn: IStory = {
  args: {
    ...base.args,
    user: {
      name: "Jane Doe",
    },
  },
};
