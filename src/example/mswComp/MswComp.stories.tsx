import { expect, waitFor, within } from "@storybook/test";
import { deepmerge } from "deepmerge-ts";

import {
  sampleError400,
  sampleNetworkError,
  sampleNoData,
} from "@src/test/msw/handlers/sampleHandlers";

import { MSWExample } from "./MswComp";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta = {
  component: MSWExample,
} satisfies Meta<typeof MSWExample>;
export default meta;
type IStory = StoryObj<typeof meta>;

// Base: default story props
const base: IStory = {};

/**
 * Stories: merge over base.\
 * TS requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const Default: IStory = deepmerge(base, {
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("MSW Example")).toBeVisible();
    });
    await expect(canvas.getByText(/mockValue/i)).toBeVisible();
  },
});

export const ErrorResponse: IStory = deepmerge(base, {
  parameters: {
    msw: {
      handlers: [sampleError400],
    },
  },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(
        canvas.getByText("Error: Request failed with status code 400")
      ).toBeVisible();
    });
  },
});

export const BadRequest: IStory = deepmerge(base, {
  parameters: {
    msw: {
      handlers: [sampleNetworkError],
    },
  },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("Error: Network Error")).toBeVisible();
    });
  },
});

export const NoData: IStory = deepmerge(base, {
  parameters: {
    msw: {
      handlers: [sampleNoData],
    },
  },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("No data")).toBeVisible();
    });
  },
});
