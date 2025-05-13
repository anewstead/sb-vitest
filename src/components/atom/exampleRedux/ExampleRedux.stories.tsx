import { fn } from "@storybook/test";

import { ExampleRedux } from "./ExampleSection";

import type { Meta, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: ExampleRedux,
} satisfies Meta<typeof ExampleRedux>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    exampleText: "This is an example text",
    buttonLabel: "Change Text",
    onChangeText: fn(),
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = base;
