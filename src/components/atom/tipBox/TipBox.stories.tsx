import React from "react";

import { TipBox } from "./TipBox";

import type { Meta, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: TipBox,
} satisfies Meta<typeof TipBox>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
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
export const Default: IStory = base;

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
