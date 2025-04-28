import { expect, waitFor, within } from "@storybook/test";
import { deepmerge } from "deepmerge-ts";

import {
  sampleError400,
  sampleErrorNetwork,
  sampleNoData,
} from "@src/test/msw/handlers/sampleHandlers";

import { MSWExample } from "./MswComp";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

// --------------------------------------------------------------------------
// meta: component type only
// --------------------------------------------------------------------------
const meta = {
  component: MSWExample,
} satisfies Meta<typeof MSWExample>;
export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------------------------------------------------------
// base: default story props
// --------------------------------------------------------------------------
const base: Story = {};

// --------------------------------------------------------------------------
// stories: merge over base
// --------------------------------------------------------------------------
export const Default: Story = deepmerge(base, {
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("MSW Example")).toBeVisible();
    });
  },
});

export const ErrorResponse: Story = deepmerge(base, {
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

export const BadRequest: Story = deepmerge(base, {
  parameters: {
    msw: {
      handlers: [sampleErrorNetwork],
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

export const NoData: Story = deepmerge(base, {
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
