import React, { useState } from "react";

import { expect, fn, within } from "@storybook/test";

import { selectMuiOption } from "@src/test/utils/selectMuiOption";

import { MySelect } from "./MySelect";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: MySelect,
} satisfies Meta<typeof MySelect>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    labelText: "Select language",
    initialValue: "en-GB",
    items: [
      { value: "en-GB", label: "English" },
      { value: "es-ES", label: "Español" },
      { value: "fr-FR", label: "Français" },
    ],
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState(args.initialValue);
    return (
      <MySelect
        {...args}
        initialValue={value}
        onChange={(item) => {
          setValue(item.value); // Update local state for controlled component
          args.onChange(item); // Call mock function for test assertions
        }}
      />
    );
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);

    const languageSelect = canvas.getByLabelText("Select language");

    await expect(languageSelect).toBeVisible();
    await expect(languageSelect).toHaveTextContent("English");

    await selectMuiOption(languageSelect, "Español");

    await expect(languageSelect).toHaveTextContent("Español");
    await expect(args.onChange).toHaveBeenCalledWith({
      value: "es-ES",
      label: "Español",
    });
  },
};
