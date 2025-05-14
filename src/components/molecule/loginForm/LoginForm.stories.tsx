import { expect, fn, userEvent, within } from "@storybook/test";

import { LoginForm } from "./LoginForm";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    emailLabel: "Email",
    emailValue: "",
    passwordLabel: "Password",
    passwordValue: "",
    onEmailChange: fn(),
    onPasswordChange: fn(),
    onSubmit: fn((e: React.FormEvent) => {
      e.preventDefault();
    }),
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = base;

export const WithErrors: IStory = {
  ...base,
  args: {
    ...base.args,
    emailValue: "invalid-email",
    emailError: "Please enter a valid email address",
    passwordValue: "short",
    passwordError: "Password must be at least 8 characters",
  },
};

export const WithFilledValues: IStory = {
  ...base,
  args: {
    ...base.args,
    emailValue: "user@example.com",
    passwordValue: "password123",
  },
};

export const WithInteraction: IStory = {
  ...base,
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);

    // Type in email field
    const emailInput = canvas.getByLabelText("Email");
    await userEvent.type(emailInput, "test@example.com");
    await expect(base.args.onEmailChange).toHaveBeenCalled();

    // Type in password field
    const passwordInput = canvas.getByLabelText("Password");
    await userEvent.type(passwordInput, "password123");
    await expect(base.args.onPasswordChange).toHaveBeenCalled();

    // Submit form
    const submitButton = canvas.getByRole("button", { name: "Login" });
    await userEvent.click(submitButton);
    await expect(base.args.onSubmit).toHaveBeenCalled();
  },
};
