import React, { useCallback, useEffect, useRef } from "react";

import { addons } from "@storybook/preview-api";
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode";

import { ThemeWrapper } from "@src/wrappers/themeWrapper/ThemeWrapper";

import {
  getStorybookTheme,
  getUserPreferTheme,
  setSbThemeToSystem,
} from "./themeHelpers";
import { ThemeSyncStorybookMui } from "./ThemeSyncStorybookMui";

import type { ReactNode } from "react";

type ThemeMode = "light" | "dark" | "system";

type IThemePreviewContainerProps = { children: ReactNode };

const channel = addons.getChannel();

export const ThemePreviewContainer = ({
  children,
}: IThemePreviewContainerProps) => {
  const allowThemeDispatch = useRef(true);

  const onSbThemeChange = useCallback(() => {
    if (allowThemeDispatch.current) {
      document.dispatchEvent(
        new CustomEvent("SB_THEME_CHANGED", { detail: getStorybookTheme() })
      );
    } else {
      allowThemeDispatch.current = true;
    }
  }, []);

  const onMuiThemeChange = useCallback((e: Event) => {
    const muiTheme = (e as CustomEvent).detail as ThemeMode;
    const isSystem = muiTheme === "system";
    const updateTheme = isSystem ? getUserPreferTheme() : muiTheme;
    allowThemeDispatch.current = false;
    channel.emit(UPDATE_DARK_MODE_EVENT_NAME, updateTheme);
    setSbThemeToSystem(isSystem);
  }, []);

  // init: darkmode-addon listener
  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, onSbThemeChange);
    return () => {
      channel.removeListener(DARK_MODE_EVENT_NAME, onSbThemeChange);
    };
  }, [onSbThemeChange]);

  // init: mui-theme listener
  useEffect(() => {
    document.addEventListener("MUI_THEME_CHANGED", onMuiThemeChange);
    return () => {
      document.removeEventListener("MUI_THEME_CHANGED", onMuiThemeChange);
    };
  }, [onMuiThemeChange]);

  return (
    <ThemeWrapper>
      <ThemeSyncStorybookMui />
      {children}
    </ThemeWrapper>
  );
};
