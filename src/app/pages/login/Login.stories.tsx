import { Login } from "./Login";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Login,
} satisfies Meta<typeof Login>;
export default meta;
type IStory = StoryObj<typeof meta>;

export const Default: IStory = {};
