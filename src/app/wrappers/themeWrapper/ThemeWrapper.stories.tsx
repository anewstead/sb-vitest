import React from "react";

import { expect, waitFor, within } from "@storybook/test";

import { defaultTheme } from "@src/common/style/theme";
import { DARK_CLASS, LIGHT_CLASS } from "@src/common/style/themes/base";

import { ThemeWrapper } from "./ThemeWrapper";
import { THEME_STORAGE_KEY } from "./themeWrapper.helper";

import type { IThemeBaseProps } from "./themeWrapper.type";
import type { IThemeName } from "@src/common/style/theme.type";
import type { Meta, StoryContext, StoryObj } from "@storybook/react";

/*
Meta: ONLY set meta.component
*/
const meta: Meta<typeof ThemeWrapper> = {
  component: ThemeWrapper,
};
export default meta;
type IStory = StoryObj<typeof meta>;

/*
Base: default story props. NO play functions
*/
const base: IStory = {
  render: (args: IThemeBaseProps) => {
    return (
      <ThemeWrapper {...args}>
        <div data-testid="child-content">
          <h2>Theme Wrapper</h2>
          <p>See Theme buttons for additional behavior</p>
        </div>
      </ThemeWrapper>
    );
  },
};

/*
Stories: each story should ...spread merge from base as required
*/
export const Default: IStory = {
  ...base,
  play: async ({ canvasElement, step }: StoryContext) => {
    const canvas = within(canvasElement);
    await step("renders in default theme mode", async () => {
      const content = canvas.getByTestId("child-content");
      await expect(content).toBeVisible();

      const htmlElem = canvasElement.ownerDocument.documentElement;
      const muiMode = localStorage.getItem("mui-mode");

      let expectedClass = LIGHT_CLASS;
      if (muiMode === "dark") {
        expectedClass = DARK_CLASS;
      } else if (muiMode === "system") {
        const prefersDarkScheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (prefersDarkScheme) {
          expectedClass = DARK_CLASS;
        }
      }

      await waitFor(async () => {
        await expect(htmlElem).toHaveClass(expectedClass);
      });
    });

    await step(
      "initial theme matches default theme configuration",
      async () => {
        // Check that the theme name is set to blue (default theme)
        const themeName = localStorage.getItem(THEME_STORAGE_KEY);
        await expect(themeName).toBe(defaultTheme.name);
      }
    );
  },
};

export const UnknownTheme: IStory = {
  ...base,
  args: {
    initialTheme: "unknown-theme" as IThemeName,
  },
  play: async ({ canvasElement, step }: StoryContext) => {
    const canvas = within(canvasElement);
    await step(
      "falls back to default theme when unknown theme is passed",
      async () => {
        const content = canvas.getByTestId("child-content");
        await expect(content).toBeVisible();

        const themeName = localStorage.getItem(THEME_STORAGE_KEY);
        await expect(themeName).toBe(defaultTheme.name);
      }
    );
  },
};
