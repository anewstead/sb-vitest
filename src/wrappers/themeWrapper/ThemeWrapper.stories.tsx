import React from "react";

import { expect, waitFor, within } from "@storybook/test";

import { defaultTheme } from "@src/style/theme";
import { DARK_CLASS, LIGHT_CLASS } from "@src/style/themes/base";

import { ThemeWrapper } from "./ThemeWrapper";
import { THEME_STORAGE_KEY } from "./themeWrapper.helper";

import type { IThemeBaseProps } from "./ThemeWrapper";
import type { ThemeName } from "@src/style/theme";
import type { Meta, StoryObj } from "@storybook/react";

// Meta: ONLY set meta.component
const meta: Meta<typeof ThemeWrapper> = {
  component: ThemeWrapper,
};
export default meta;
type Story = StoryObj<typeof meta>;

// Base: default story props
const base: Story = {
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

/**
 * Stories: merge over base.\
 * Typescript requires that non-optional props be explicitly set\
 * Or ...spread from base when overriding
 */
export const Default: Story = {
  ...base,
  play: async ({ canvasElement, step }) => {
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

export const UnknownTheme: Story = {
  ...base,
  args: {
    initialTheme: "unknown-theme" as ThemeName,
  },
  play: async ({ canvasElement, step }) => {
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
