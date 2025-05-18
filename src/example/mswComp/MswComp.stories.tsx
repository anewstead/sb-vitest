import { expect, waitFor, within } from "@storybook/test";

import {
  sampleError400,
  sampleNetworkError,
  sampleNoData,
} from "@src/test/msw/handlers/sampleHandlers";

import { MSWExample } from "./MswComp";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: MSWExample,
} satisfies Meta<typeof MSWExample>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("MSW Example")).toBeVisible();
    });
    await expect(canvas.getByText(/mockValue/i)).toBeVisible();
  },
};

export const ErrorResponse: IStory = {
  ...base,
  parameters: {
    msw: {
      handlers: [sampleError400],
    },
  },
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(
        canvas.getByText("Error: Request failed with status code 400")
      ).toBeVisible();
    });
  },
};

export const BadRequest: IStory = {
  ...base,
  parameters: {
    msw: {
      handlers: [sampleNetworkError],
    },
  },
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("Error: Network Error")).toBeVisible();
    });
  },
};

export const NoData: IStory = {
  ...base,
  parameters: {
    msw: {
      handlers: [sampleNoData],
    },
  },
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("No data")).toBeVisible();
    });
  },
};
