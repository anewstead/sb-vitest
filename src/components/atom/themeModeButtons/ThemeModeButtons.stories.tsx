import { expect, userEvent, within } from "@storybook/test";

import { DARK_CLASS, LIGHT_CLASS } from "@src/common/style/themes/base";

import { ThemeModeButtons } from "./ThemeModeButtons";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta = {
  component: ThemeModeButtons,
} satisfies Meta<typeof ThemeModeButtons>;
export default meta;
type IStory = StoryObj<typeof meta>;
type IPlayProps = StoryContext<IStory["args"]>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  args: {},
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement, step }: IPlayProps) => {
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

    await step("Toggle to dark mode", async () => {
      await userEvent.click(darkBtn);
      await expect(lightBtn).not.toHaveClass(activeAclass);
      await expect(darkBtn).toHaveClass(activeAclass);
      await expect(systemBtn).not.toHaveClass(activeAclass);
      await expect(themeElement).toHaveClass(DARK_CLASS);
    });

    await step("Toggle to light mode", async () => {
      await userEvent.click(lightBtn);
      await expect(lightBtn).toHaveClass(activeAclass);
      await expect(darkBtn).not.toHaveClass(activeAclass);
      await expect(systemBtn).not.toHaveClass(activeAclass);
      await expect(themeElement).toHaveClass(LIGHT_CLASS);
    });

    await step("Toggle to system mode", async () => {
      await userEvent.click(systemBtn);
      await expect(lightBtn).not.toHaveClass(activeAclass);
      await expect(darkBtn).not.toHaveClass(activeAclass);
      await expect(systemBtn).toHaveClass(activeAclass);
      const lightOrDarkRegex = new RegExp(`(${LIGHT_CLASS}|${DARK_CLASS})`);
      await expect(themeElement.className).toMatch(lightOrDarkRegex);
    });
  },
};
