import { expect, waitFor, within } from "@storybook/test";
import { deepmerge } from "deepmerge-ts";
import { withRouter } from "storybook-addon-remix-react-router";

import { homeReducer } from "@src/app/state/home/slice";
import {
  contentError,
  contentSlow,
  contentSuccess,
} from "@src/common/test/msw/handlers/i18nContentHandlers";
import { i18nSuccess } from "@src/common/test/msw/handlers/i18nJsonHandlers";
import { withStore } from "@src/common/test/StoryStore";

import { Home } from "./Home";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta = {
  component: Home,
} satisfies Meta<typeof Home>;
export default meta;
type IStory = StoryObj<typeof meta>;

// Base: default story props. NO play functions
const base: IStory = {
  decorators: [withRouter, withStore({ home: homeReducer })],
  parameters: {
    msw: {
      handlers: [i18nSuccess, contentSuccess],
    },
  },
};

/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const LoggedOut: IStory = deepmerge(base, {
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

export const LoggedIn: IStory = deepmerge(base, {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
});

export const Error: IStory = {
  ...base,
  parameters: {
    ...base.parameters,
    msw: {
      handlers: [contentError],
    },
  },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    const content = canvas.getByTestId("pageContent");

    await waitFor(async () => {
      await expect(content).toHaveTextContent(/Error:/);
    });
  },
};

export const Loading: IStory = {
  ...base,
  parameters: {
    ...base.parameters,
    msw: {
      handlers: [contentSlow],
    },
  },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    const content = canvas.getByTestId("pageContent");

    await waitFor(async () => {
      await expect(content).toHaveTextContent("...");
    });
  },
};
