import { fn } from "@storybook/test";

import { ExampleRedux } from "./ExampleSection";

import type { Meta, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta = {
  component: ExampleRedux,
} satisfies Meta<typeof ExampleRedux>;
export default meta;
type IStory = StoryObj<typeof meta>;

// Base: default story props
const base: IStory = {
  args: {
    exampleText: "This is an example text",
    buttonLabel: "Change Text",
    onChangeText: fn(),
  },
};

/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const Default: IStory = base;
