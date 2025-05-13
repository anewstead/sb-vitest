import React, { useState } from "react";

import { expect, fn, within } from "@storybook/test";

import { selectMuiOption } from "@src/common/test/utils/selectMuiOption";

import { MySelect } from "./MySelect";

import type { Meta, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta = {
  component: MySelect,
} satisfies Meta<typeof MySelect>;
export default meta;
type IStory = StoryObj<typeof meta>;

// Base: default story props
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

/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement, args }) => {
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
