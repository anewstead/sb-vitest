import React from "react";

import { fn } from "@storybook/test";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";

import { homeReducer } from "@src/state/home/slice";
import { setupStore } from "@src/state/store";

import { Home } from "./Home";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Home,
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
  decorators: [
    (Story) => {
      return (
        <Provider store={setupStore({ home: homeReducer })}>
          <BrowserRouter>{Story()}</BrowserRouter>
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof Home>;

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
