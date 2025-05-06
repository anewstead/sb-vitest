import React from "react";

import { ThemeWrapper } from "@src/wrappers/themeWrapper/ThemeWrapper";

import { ThemeSyncSbMuiMode } from "./ThemeSyncSbMuiMode";

import type { Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type IThemePreviewContainerProps = {
  children: ReactNode;
  theme: Theme;
};

export const ThemePreviewContainer = (props: IThemePreviewContainerProps) => {
  const { children, theme } = props;

  return (
    <ThemeWrapper initialTheme={theme}>
      <ThemeSyncSbMuiMode />
      {children}
    </ThemeWrapper>
  );
};
