import React, { useCallback, useEffect, useRef } from "react";

import { addons } from "@storybook/preview-api";
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode";

import { ThemeWrapper } from "@src/wrappers/themeWrapper/ThemeWrapper";

import {
  getStorybookMode,
  getUserPreferMode,
  setSbModeToSystem,
} from "./themeHelpersMode";
import {
  MUI_MODE_CHANGE_EVENT,
  ThemeSyncSbMuiMode,
} from "./ThemeSyncSbMuiMode";

import type { Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type ThemeMode = "light" | "dark" | "system";

type IThemePreviewContainerProps = {
  children: ReactNode;
  theme: Theme;
};

const channel = addons.getChannel();

export const SB_MODE_CHANGE_EVENT = "SB_MODE_CHANGE_EVENT";

export const ThemePreviewContainer = (props: IThemePreviewContainerProps) => {
  const { children, theme } = props;
  const allowModeDispatch = useRef(true);

  const onSbModeChange = useCallback(() => {
    if (allowModeDispatch.current) {
      document.dispatchEvent(
        new CustomEvent(SB_MODE_CHANGE_EVENT, { detail: getStorybookMode() })
      );
    } else {
      allowModeDispatch.current = true;
    }
  }, []);

  const onMuiModeChange = useCallback((e: Event) => {
    const muiMode = (e as CustomEvent).detail as ThemeMode;
    const isSystem = muiMode === "system";
    const updateMode = isSystem ? getUserPreferMode() : muiMode;
    allowModeDispatch.current = false;
    channel.emit(UPDATE_DARK_MODE_EVENT_NAME, updateMode);
    setSbModeToSystem(isSystem);
  }, []);

  // init: darkmode-addon listener
  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, onSbModeChange);
    return () => {
      channel.removeListener(DARK_MODE_EVENT_NAME, onSbModeChange);
    };
  }, [onSbModeChange]);

  // init: mui-mode listener
  useEffect(() => {
    document.addEventListener(MUI_MODE_CHANGE_EVENT, onMuiModeChange);
    return () => {
      document.removeEventListener(MUI_MODE_CHANGE_EVENT, onMuiModeChange);
    };
  }, [onMuiModeChange]);

  return (
    <ThemeWrapper initialTheme={theme}>
      <ThemeSyncSbMuiMode />
      {children}
    </ThemeWrapper>
  );
};
