import { expect, userEvent, within } from "@storybook/test";

import { Login } from "./Login";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Login,
} satisfies Meta<typeof Login>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if form elements are rendered
    const emailInput = canvas.getByLabelText("Email");
    const passwordInput = canvas.getByLabelText("Password");
    const loginButton = canvas.getByRole("button", { name: "Login" });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    // Test form interaction
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(loginButton);
  },
};
