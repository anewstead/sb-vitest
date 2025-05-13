import { fn } from "@storybook/test";

import { ContentPage } from "./ContentPage";

import type { Meta, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: ContentPage,
} satisfies Meta<typeof ContentPage>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    title: "Example Content Page",
    content: "This is the main content of the page.",
    tipBoxProps: {
      label: "Tip",
      text: "This is a helpful tip for the user.",
    },
    headerProps: {
      loginBarProps: {
        onLogin: fn(),
        onLogout: fn(),
        onCreateAccount: fn(),
        welcomeText: "Welcome",
        loginText: "Log in",
        logoutText: "Log out",
        signupText: "Sign up",
      },
    },
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = base;
