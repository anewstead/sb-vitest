import { expect, waitFor, within } from "@storybook/test";
import { deepmerge } from "deepmerge-ts";
import { http, HttpResponse } from "msw";
import { withRouter } from "storybook-addon-remix-react-router";

import { homeReducer } from "@src/state/home/slice";
import { withStore } from "@src/test/storybook/Decorators";

import { Home } from "./Home";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/**
 * Meta: ONLY set meta.component
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
  decorators: [withRouter, withStore({ home: homeReducer })],
};
/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const LoggedOut: Story = deepmerge(base, {
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    const text = canvas.getByTestId("example-text");
    const initialText = text.textContent ?? "";

    const button = canvas.getByRole("button", { name: /change text/i });
    button.click();

    await waitFor(async () => {
      await expect(text.textContent).not.toBe(initialText);
    });
    const newText = text.textContent ?? "";

    button.click();

    await waitFor(async () => {
      await expect(text.textContent).not.toBe(newText);
    });
  },
});

export const LoggedIn: Story = deepmerge(base, {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
});

export const Error: Story = deepmerge(base, {
  parameters: {
    msw: {
      handlers: [
        http.get("/i18n/content/en-GB/home.md", () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
});
