import React, { useState } from "react";

import { expect, fn, userEvent, within } from "@storybook/test";

import { MyInput } from "./MyInput";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: MyInput,
} satisfies Meta<typeof MyInput>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    label: "Username",
    value: "",
    onChange: fn(),
    placeholder: "Enter your username",
    required: true,
    id: "username-input",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <MyInput
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue); // Update local state for controlled component
          args.onChange(newValue); // Call mock function for test assertions
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
    const input = canvas.getByRole("textbox", { name: "Username" });
    await expect(input).toBeVisible();
    await expect(input).toHaveValue("");

    await userEvent.type(input, "john.doe");
    await expect(input).toHaveValue("john.doe");
    await expect(args.onChange).toHaveBeenCalledWith("john.doe");
  },
};

export const WithInitialValue: IStory = {
  ...base,
  args: {
    ...base.args,
    value: "pre-filled",
    id: "pre-filled-input",
  },
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Username" });
    await expect(input).toHaveValue("pre-filled");
  },
};

export const WithError: IStory = {
  ...base,
  args: {
    ...base.args,
    value: "invalid@email",
    helperText: "Please enter a valid email address",
    id: "error-input",
  },
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Username" });
    const errorMessage = canvas.getByText("Please enter a valid email address");

    await expect(input).toBeVisible();
    await expect(input).toHaveValue("invalid@email");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(errorMessage).toBeVisible();
  },
};

export const Password: IStory = {
  ...base,
  args: {
    ...base.args,
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    id: "password-input",
  },
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(args.placeholder!);
    await expect(input).toHaveAttribute("type", "password");
  },
};

export const Number: IStory = {
  ...base,
  args: {
    ...base.args,
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    value: "",
    id: "age-input",
  },
  play: async ({ canvasElement, args }: IPlayProps) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: "Age" });
    await expect(input).toBeVisible();
    await expect(input).toHaveValue(null);
    await expect(input).toHaveAttribute("type", "number");

    // Test number input
    await userEvent.type(input, "25");
    await expect(input).toHaveValue(25);
    await expect(args.onChange).toHaveBeenCalledWith("25");

    // Test invalid input (letters)
    await userEvent.clear(input);
    await userEvent.type(input, "abc");
    await expect(input).toHaveValue(null);
  },
};

/**
 * Note. No have extra validation for tel formats at this level
 */
export const Tel: IStory = {
  ...base,
  args: {
    ...base.args,
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
    value: "",
    id: "phone-input",
  },
  play: async ({ canvasElement }: IPlayProps) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Phone Number" });
    await expect(input).toHaveAttribute("type", "tel");
  },
};
