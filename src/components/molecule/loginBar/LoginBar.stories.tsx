import { expect, fn, within } from "@storybook/test";

import { LoginBar } from "./LoginBar";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: set ONLY meta.component here
*/
const meta = {
  component: LoginBar,
} satisfies Meta<typeof LoginBar>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play function here
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
export const LoggedOut: IStory = {
  ...base,
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole("button", { name: args.loginText });
    const signupButton = canvas.getByRole("button", { name: args.signupText });

    await expect(loginButton).toBeVisible();
    await expect(signupButton).toBeVisible();

    loginButton.click();
    await expect(args.onLogin).toHaveBeenCalled();

    signupButton.click();
    await expect(args.onCreateAccount).toHaveBeenCalled();
  },
};

export const LoggedIn: IStory = {
  args: {
    ...base.args,
    user: {
      name: "Jane Doe",
    },
  },
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);
    const welcomeText = canvas.getByText(
      `${args.welcomeText} ${args.user!.name}`
    );
    await expect(welcomeText).toBeVisible();
  },
};
