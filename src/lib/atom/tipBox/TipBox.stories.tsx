import React from "react";

import { deepmerge } from "deepmerge-ts";

import { TipBox } from "./TipBox";

import type { Meta, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta = {
  component: TipBox,
} satisfies Meta<typeof TipBox>;
export default meta;
type IStory = StoryObj<typeof meta>;

// Base: default story props
const base: IStory = {
  args: {
    label: "Tip",
    text: "This is a basic tip message.",
  },
};

/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const Default: IStory = base;

export const WithHTMLContent: IStory = deepmerge(base, {
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
});
