import { expect, fn, within } from "@storybook/test";

import { Header } from "./Header";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: set ONLY meta.component here
*/
const meta = {
  component: Header,
} satisfies Meta<typeof Header>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play function here
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
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);

    // Verify ThemeControls is present
    const themeControls = canvas.getByRole("button", {
      name: /light/i,
    });
    await expect(themeControls).toBeVisible();

    const logo = canvas.getByRole("img", { name: "Acme Logo" });
    await expect(logo).toBeVisible();
  },
};
