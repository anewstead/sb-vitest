import { expect, fn, within } from "@storybook/test";

import { ContentPage } from "./ContentPage";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: set ONLY meta.component here
*/
const meta = {
  component: ContentPage,
} satisfies Meta<typeof ContentPage>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play function here
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
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);

    // Verify Header is present
    const logo = canvas.getByRole("img", { name: "Acme Logo" });
    await expect(logo).toBeVisible();

    // Verify content is present
    const title = canvas.getByText(args.title);
    await expect(title).toBeVisible();

    const content = canvas.getByText(args.content as string);
    await expect(content).toBeVisible();

    // Verify TipBox is present
    const tipLabel = canvas.getByText(args.tipBoxProps.label);
    await expect(tipLabel).toBeVisible();
  },
};
