import React from "react";

import { deepmerge } from "deepmerge-ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";

import { homeReducer } from "@src/state/home/slice";
import { setupStore } from "@src/state/store";

import { Home } from "./Home";

import type { Meta, StoryObj } from "@storybook/react";

/**
 * Meta: set component type only
 */
const meta = {
  component: Home,
} satisfies Meta<typeof Home>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base: default story props
 */
const base: Story = {
  parameters: {
    reactI18next: {
      i18n: {
        defaultLocale: "en-GB",
        locales: ["en-GB"],
      },
    },
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
};

/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const LoggedOut: Story = deepmerge(base, {});

export const LoggedIn: Story = deepmerge(base, {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
});
