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

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {
    labelText: "Username",
    initialValue: "",
    onChange: fn(),
    placeholder: "Enter your username",
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.initialValue);
    return (
      <MyInput
        {...args}
        initialValue={value}
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
  play: async ({ canvasElement, args }: StoryContext) => {
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
    initialValue: "pre-filled",
  },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Username" });
    await expect(input).toHaveValue("pre-filled");
  },
};

export const Password: IStory = {
  ...base,
  args: {
    ...base.args,
    labelText: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await expect(input).toHaveAttribute("type", "password");
  },
};

export const Number: IStory = {
  ...base,
  args: {
    ...base.args,
    labelText: "Age",
    type: "number",
    placeholder: "Enter your age",
    initialValue: "",
  },
  play: async ({ canvasElement, args }: StoryContext) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Age");

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

export const Phone: IStory = {
  ...base,
  args: {
    ...base.args,
    labelText: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
    initialValue: "",
  },
  play: async ({ canvasElement, args }: StoryContext) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Phone Number");

    await expect(input).toBeVisible();
    await expect(input).toHaveValue("");
    await expect(input).toHaveAttribute("type", "tel");

    // Test phone number input with numbers
    await userEvent.type(input, "1234567890");
    await expect(input).toHaveValue("1234567890");
    await expect(args.onChange).toHaveBeenCalledWith("1234567890");

    // Test with formatting
    await userEvent.clear(input);
    await userEvent.type(input, "(123) 456-7890");
    await expect(input).toHaveValue("(123) 456-7890");
    await expect(args.onChange).toHaveBeenCalledWith("(123) 456-7890");

    // Test with international format
    await userEvent.clear(input);
    await userEvent.type(input, "+1 (123) 456-7890");
    await expect(input).toHaveValue("+1 (123) 456-7890");
    await expect(args.onChange).toHaveBeenCalledWith("+1 (123) 456-7890");

    // Test with invalid characters
    await userEvent.clear(input);
    await userEvent.type(input, "abc123");
    // The input should only accept the numbers
    await expect(input).toHaveValue("123");
    await expect(args.onChange).toHaveBeenCalledWith("123");
  },
};
