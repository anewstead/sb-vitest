import { expect, waitFor, within } from "@storybook/test";

import {
  sampleError400,
  sampleErrorNetwork,
  sampleNoData,
} from "@src/test/msw/handlers/sampleHandlers";

import { MSWExample } from "./MswComp";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: MSWExample,
} satisfies Meta<typeof MSWExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("MSW Example")).toBeVisible();
    });
  },
};

export const ErrorResponse: Story = {
  parameters: {
    msw: {
      handlers: [sampleError400],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(
        canvas.getByText("Error: Request failed with status code 400")
      ).toBeVisible();
    });
  },
};

export const BadRequest: Story = {
  parameters: {
    msw: {
      handlers: [sampleErrorNetwork],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("Error: Network Error")).toBeVisible();
    });
  },
};

export const NoData: Story = {
  parameters: {
    msw: {
      handlers: [sampleNoData],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeVisible();
    await waitFor(async () => {
      await expect(canvas.getByText("No data")).toBeVisible();
    });
  },
};
