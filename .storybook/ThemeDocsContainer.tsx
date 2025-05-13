import React, { useEffect, useState } from "react";

import { DocsContainer } from "@storybook/addon-docs";
import { addons } from "@storybook/preview-api";
import { themes as storybookThemes } from "@storybook/theming";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";

import { getStorybookMode, getUserPreferMode } from "./themeModeHelpers";

import type { DocsContainerProps } from "@storybook/addon-docs";
import type { ReactNode } from "react";

const channel = addons.getChannel();

const storybookPreviewIframeDocumentStyles = `
.docs-story {
  background-color: var(--dc-palette-background-default);
}
/* fix mdx headers in darkmode */
.css-1ofkq6d {
  float: left;
  line-height: inherit;
  padding-right: 10px;
  margin-left: -24px;
  color: inherit;
}
`;

type IThemeDocsContainerProps = DocsContainerProps & { children: ReactNode };

export const ThemeDocsContainer = ({
  children,
  context,
}: IThemeDocsContainerProps) => {
  const [isDark, setDark] = useState(false);

  // init: add theme styles
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = storybookPreviewIframeDocumentStyles;
    document.head.appendChild(style);
    // Cleanup on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // init: ensure correct theme on first load
  useEffect(() => {
    let initTheme = getStorybookMode();
    if (initTheme === "system") {
      initTheme = getUserPreferMode();
    }
    setDark(initTheme === "dark");
  }, []);

  // init: add theme change listener
  useEffect(() => {
    const handleSetDark = (setToDark: boolean) => {
      setDark(setToDark);
    };
    channel.on(DARK_MODE_EVENT_NAME, handleSetDark);
    return () => {
      channel.off(DARK_MODE_EVENT_NAME, handleSetDark);
    };
  }, [setDark]);

  const activeTheme = isDark ? storybookThemes.dark : storybookThemes.light;

  return (
    <DocsContainer context={context} theme={activeTheme}>
      {children}
    </DocsContainer>
  );
};
