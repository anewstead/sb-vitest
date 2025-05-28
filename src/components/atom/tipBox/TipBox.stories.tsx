import React from "react";

import { expect, within } from "@storybook/test";

import { TipBox } from "./TipBox";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: set ONLY meta.component here
*/
const meta = {
  component: TipBox,
} satisfies Meta<typeof TipBox>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play function here
*/
const base: IStory = {
  args: {
    label: "Tip",
    text: "This is a basic tip message.",
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText(args.label);
    const text = canvas.getByText(args.text as string);
    await expect(label).toBeVisible();
    await expect(text).toBeVisible();
  },
};

export const WithHTMLContent: IStory = {
  args: {
    label: "Important",
    text: (
      <div>
        <p>
          This tip contains <strong>HTML</strong> content.
        </p>
        <p>You can use multiple paragraphs and formatting.</p>
      </div>
    ),
  },
};
