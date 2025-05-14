import { Login } from "./Login";
import { within, userEvent } from "@storybook/test";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: Login,
} satisfies Meta<typeof Login>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = base;

export const WithValidationErrors: IStory = {
  ...base,
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText(/email/i);
    const passwordInput = canvas.getByLabelText(/password/i);
    const submitButton = canvas.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(passwordInput, "12345");
    await userEvent.click(submitButton);
  },
};

export const WithValidSubmission: IStory = {
  ...base,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText(/email/i);
    const passwordInput = canvas.getByLabelText(/password/i);
    const submitButton = canvas.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);
  },
};
