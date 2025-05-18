import { expect, waitFor, within } from "@storybook/test";
import { withRouter } from "storybook-addon-remix-react-router";

import { homeReducer } from "@src/state/home/slice";
import {
  contentError,
  contentSlow,
} from "@src/test/msw/handlers/i18nContentHandlers";
import { withStore } from "@src/test/StoryStore";

import { Home } from "./Home";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: Home,
} satisfies Meta<typeof Home>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  decorators: [withRouter, withStore({ home: homeReducer })],
};

/*
Stories: each story should ...spread merge from base as required
*/
export const LoggedOut: IStory = {
  ...base,
  play: async ({ canvasElement }: IPlayProps) => {
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
};

export const LoggedIn: IStory = {
  ...base,
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};

export const Error: IStory = {
  ...base,
  parameters: {
    ...base.parameters,
    msw: {
      handlers: [contentError],
    },
  },
  play: async ({ canvasElement }: IPlayProps) => {
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
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);
    const content = canvas.getByTestId("pageContent");

    await waitFor(async () => {
      await expect(content).toHaveTextContent("...");
    });
  },
};
