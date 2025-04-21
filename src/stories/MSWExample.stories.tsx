import {
  sampleBadRequest,
  sampleErrorResponse,
} from "@src/testing/msw/handlers/sampleHandlers";

import { MSWExample } from "./MSWExample";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/MSWExample",
  component: MSWExample,
} satisfies Meta<typeof MSWExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // Uses the default handler from preview.tsx
};

export const ErrorResponse: Story = {
  parameters: {
    msw: {
      handlers: [sampleErrorResponse],
    },
  },
};

export const BadRequest: Story = {
  parameters: {
    msw: {
      handlers: [sampleBadRequest],
    },
  },
};
