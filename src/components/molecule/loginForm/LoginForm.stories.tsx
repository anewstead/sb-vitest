import { expect, fn, userEvent, within } from "@storybook/test";

import { LoginForm } from "./LoginForm";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";
import type React from "react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  argTypes: {
    email: {
      control: false, // hide browser
    },
    password: {
      control: false, // hide browser
    },
  },
  args: {
    email: {
      id: "email",
      label: "Email",
      value: "",
      onChange: fn(),
    },
    password: {
      id: "password",
      label: "Password",
      value: "",
      placeholder: "Enter your password",
      onChange: fn(),
    },
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
    email: {
      ...base.args.email,
      value: "invalid-email",
      helperText: "Please enter a valid email address",
    },
    password: {
      ...base.args.password,
      value: "short",
      helperText: "Password must be at least 8 characters",
    },
  },
};

export const WithFilledValues: IStory = {
  ...base,
  args: {
    ...base.args,
    email: {
      ...base.args.email,
      value: "user@example.com",
    },
    password: {
      ...base.args.password,
      value: "password123",
    },
  },
};

export const WithInteraction: IStory = {
  ...base,
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);

    // Type in email field
    const emailInput = canvas.getByRole("textbox", { name: "Email" });
    await userEvent.type(emailInput, "test@example.com");
    await expect(base.args.email.onChange).toHaveBeenCalled();

    // Type in password field
    const passwordInput = canvas.getByLabelText(args.password.label);
    await userEvent.type(passwordInput, "password123");
    await expect(base.args.password.onChange).toHaveBeenCalled();

    // Submit form
    const submitButton = canvas.getByRole("button", { name: "Login" });
    await userEvent.click(submitButton);
    await expect(base.args.onSubmit).toHaveBeenCalled();
  },
};
