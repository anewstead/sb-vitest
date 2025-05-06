import React from "react";

import { expect, waitFor, within } from "@storybook/test";

import { DARK_CLASS, LIGHT_CLASS } from "@src/style/themes/base";

import { ThemeWrapper } from "./ThemeWrapper";

import type { IThemeBaseProps } from "./ThemeWrapper";
import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof ThemeWrapper> = {
  component: ThemeWrapper,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const Template: Story = {
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

export const Default: Story = {
  ...Template,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders content in default theme", async () => {
      const content = canvas.getByTestId("child-content");
      await expect(content).toBeInTheDocument();
      const htmlElem = document.documentElement;

      let expectedClass = LIGHT_CLASS;

      if (typeof window !== "undefined") {
        const muiMode = localStorage.getItem("mui-mode");

        const prefersDarkScheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        switch (muiMode) {
          case "dark":
            expectedClass = DARK_CLASS;
            break;
          case "light":
            expectedClass = LIGHT_CLASS;
            break;
          case "system":
            expectedClass = prefersDarkScheme ? DARK_CLASS : LIGHT_CLASS;
            break;
          default:
          // no need to handle, expectedClass already default case
        }
      }
      await waitFor(async () => {
        await expect(htmlElem).toHaveClass(expectedClass);
      });
    });
  },
};

// -----------------------------------------------------------------------------
