import { userEvent, within } from "@storybook/test";

/**
 * Utility function to select an option from a MUI Select component
 *
 * @param select - MUI Select element (role="combobox")
 * @param optionText - Text of the option to select (case sensitive)
 */
export const selectMuiOption = async (
  select: HTMLElement,
  optionText: string
) => {
  // Click the select to open dropdown layer
  await userEvent.click(select);

  // Find listbox within MUI presentation container
  const body = within(document.body);
  const presentation = await body.findByRole("presentation");
  const listbox = within(presentation).getByRole("listbox");

  // Find the option by text and click it
  const option = within(listbox).getByRole("option", {
    name: optionText,
    selected: false,
  });
  await userEvent.click(option);
};
