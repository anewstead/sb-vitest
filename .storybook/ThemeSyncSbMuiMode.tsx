import React, { useCallback, useEffect, useRef } from "react";

import { useColorScheme } from "@mui/material";

import { getStorybookMode } from "./themeHelpersMode";
import { SB_MODE_CHANGE_EVENT } from "./ThemePreviewContainer";

import type { ThemeMode } from "@src/style/theme";

export const MUI_MODE_CHANGE_EVENT = "MUI_MODE_CHANGE_EVENT";

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
export const ThemeSyncSbMuiMode = () => {
  const { mode, setMode } = useColorScheme(); // mode always undefined 1st render

  const allowModeDispatch = useRef(true);
  const modeHasInited = useRef(false);

  const onExternalModeChange = useCallback(
    (e: Event) => {
      const externalMode = (e as CustomEvent).detail as ThemeMode;
      if (mode !== externalMode) {
        allowModeDispatch.current = false;
        setMode(externalMode);
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
      setMode(getStorybookMode());
    } else if (!modeHasInited.current) {
      modeHasInited.current = true;
    } else if (allowModeDispatch.current) {
      document.dispatchEvent(
        new CustomEvent(MUI_MODE_CHANGE_EVENT, { detail: mode })
      );
    } else {
      allowModeDispatch.current = true;
    }
  }, [mode, setMode]);

  useEffect(() => {
    document.addEventListener(SB_MODE_CHANGE_EVENT, onExternalModeChange);
    return () => {
      document.removeEventListener(SB_MODE_CHANGE_EVENT, onExternalModeChange);
    };
  });

  return <></>;
};
