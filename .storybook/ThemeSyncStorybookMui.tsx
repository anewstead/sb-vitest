import React, { useCallback, useEffect, useRef } from "react";

import { useColorScheme } from "@mui/material";

import { getStorybookTheme } from "./themeHelpers";

export type ThemeMode = "light" | "dark" | "system";

/**
 * Custom events sync storybook theme and mui theme\
 * (this) component added inside storybooks preview themewrapper context\
 * Which allows it to handle event from both Storybook and Mui context
 *
 *     <EG_StoryBookPreview_MUIThemedWrapper>
 *       <ThemeSyncStorybookMui />
 *       {children / story_component}
 *     </EG_StoryBookPreview_MUIThemedWrapper>;
 */
export const ThemeSyncStorybookMui = () => {
  const { mode, setMode } = useColorScheme(); // mode always undefined 1st render

  const allowModeDispatch = useRef(true);
  const modeHasInited = useRef(false);

  const onExternalThemeChange = useCallback(
    (e: Event) => {
      const externalTheme = (e as CustomEvent).detail as ThemeMode;
      if (mode !== externalTheme) {
        allowModeDispatch.current = false;
        setMode(externalTheme);
      }
    },
    [mode, setMode]
  );

  /**
   * Initial renders\
   *
   * 1. Mode always undefined on first render,\
   *    Dont leave to default, explicitly init it to match storybook\
   * 2. Catch second render so does not dispatch from init \
   * 3. Dispatch if mode change from internal from Mui, or\
   *    Toggle allowDispatch back on if mode change was from external
   */
  useEffect(() => {
    if (!mode) {
      setMode(getStorybookTheme());
    } else if (!modeHasInited.current) {
      modeHasInited.current = true;
    } else if (allowModeDispatch.current) {
      document.dispatchEvent(
        new CustomEvent("MUI_THEME_CHANGED", { detail: mode })
      );
    } else {
      allowModeDispatch.current = true;
    }
  }, [mode, setMode]);

  useEffect(() => {
    document.addEventListener("SB_THEME_CHANGED", onExternalThemeChange);
    return () => {
      document.removeEventListener("SB_THEME_CHANGED", onExternalThemeChange);
    };
  });

  return <></>;
};
