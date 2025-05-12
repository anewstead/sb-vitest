import React from "react";

import { ThemeWrapper } from "@src/app/wrappers/themeWrapper/ThemeWrapper";

import { SyncSbMuiMode } from "./SyncSbMuiMode";
import { SyncSbMuiTheme } from "./SyncSbMuiTheme";

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
      <SyncSbMuiMode />
      <SyncSbMuiTheme />
      {children}
    </ThemeWrapper>
  );
};
