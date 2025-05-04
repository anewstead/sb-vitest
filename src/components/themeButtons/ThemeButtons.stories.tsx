import { expect, userEvent, within } from "@storybook/test";

import { ThemeButtons } from "./ThemeButtons";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof ThemeButtons> = {
  component: ThemeButtons,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

export const Default: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const lightBtn = canvas.getByRole("button", { name: "light" });
    const systemBtn = canvas.getByRole("button", { name: "system" });
    const darkBtn = canvas.getByRole("button", { name: "dark" });

    await step("Check initial render", async () => {
      await expect(lightBtn).toBeInTheDocument();
      await expect(systemBtn).toBeInTheDocument();
      await expect(darkBtn).toBeInTheDocument();
    });

    const activeAclass = "MuiButton-contained";
    const themeElement = document.documentElement; // <html> element

    const darkClass = "dc-dark";
    const lightClass = "dc-light";

    await step("Toggle to dark mode", async () => {
      await userEvent.click(darkBtn);
      await expect(lightBtn).not.toHaveClass(activeAclass);
      await expect(darkBtn).toHaveClass(activeAclass);
      await expect(systemBtn).not.toHaveClass(activeAclass);
      await expect(themeElement).toHaveClass(darkClass);
    });

    await step("Toggle to light mode", async () => {
      await userEvent.click(lightBtn);
      await expect(lightBtn).toHaveClass(activeAclass);
      await expect(darkBtn).not.toHaveClass(activeAclass);
      await expect(systemBtn).not.toHaveClass(activeAclass);
      await expect(themeElement).toHaveClass(lightClass);
    });

    await step("Toggle to system mode", async () => {
      await userEvent.click(systemBtn);
      await expect(lightBtn).not.toHaveClass(activeAclass);
      await expect(darkBtn).not.toHaveClass(activeAclass);
      await expect(systemBtn).toHaveClass(activeAclass);
      const lightOrDarkRegex = new RegExp(`(${lightClass}|${darkClass})`);
      await expect(themeElement.className).toMatch(lightOrDarkRegex);
    });
  },
};

// -----------------------------------------------------------------------------
