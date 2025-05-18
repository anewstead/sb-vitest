import { ThemeControls } from "./ThemeControls";

import type { Meta, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: ThemeControls,
} satisfies Meta<typeof ThemeControls>;
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {},
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = base;
