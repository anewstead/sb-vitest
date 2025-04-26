import { fn } from "@storybook/test";

import { Page } from "./Page";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Page,
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};

export const LoggedOut: Story = {
  args: {
    user: undefined,
  },
};
