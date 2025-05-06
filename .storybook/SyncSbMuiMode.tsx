import React, { useCallback, useEffect, useRef } from "react";

import { useColorScheme } from "@mui/material";
import { addons } from "@storybook/preview-api";
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode";

import {
  getStorybookMode,
  getUserPreferMode,
  setSbModeToSystem,
} from "./themeModeHelpers";

import type { ThemeMode } from "@src/style/theme";

const channel = addons.getChannel();

/**
 * Component to sync MUI and Storybook dark/light mode\
 * Should be added inside storybooks preview themewrapper context\
 * Which allows it to handle event from both Storybook and Mui context\
 *
 *     <StoryBookPreviewContainer>
 *       <MUIThemeWrapper>
 *         <ThemeSyncSbMuiMode />
 *         {children}
 *       </MUIThemeWrapper>
 *     </StoryBookPreviewContainer>;
 */
export const SyncSbMuiMode = () => {
  const { mode, setMode } = useColorScheme();
  const shouldUpdateMode = useRef(true);
  const modeHasInited = useRef(false);

  // Handle Storybook dark mode addon changes
  const onSBDarkModeAddonClick = useCallback(() => {
    if (shouldUpdateMode.current) {
      const sbMode = getStorybookMode();
      if (mode !== sbMode) {
        shouldUpdateMode.current = false;
        setMode(sbMode);
      }
    } else {
      shouldUpdateMode.current = true;
    }
  }, [mode, setMode]);

  // Handle MUI mode changes
  const onMuiModeChange = useCallback((newMode: ThemeMode) => {
    const isSystem = newMode === "system";
    const updateMode = isSystem ? getUserPreferMode() : newMode;
    shouldUpdateMode.current = false;
    channel.emit(UPDATE_DARK_MODE_EVENT_NAME, updateMode);
    setSbModeToSystem(isSystem);
  }, []);

  /**
   * Init
   *
   * 1. Mui's mode is undefined on first render, don't leave to default, explicitly
   *    init to match storybook
   * 2. Catch second render so does not dispatch from init
   * 3. Dispatch if mode change from internal from Mui, or Toggle shouldUpdateMode
   *    back on if mode change was from external
   */
  useEffect(() => {
    if (!mode) {
      setMode(getStorybookMode());
    } else if (!modeHasInited.current) {
      modeHasInited.current = true;
    } else if (shouldUpdateMode.current) {
      onMuiModeChange(mode);
    } else {
      shouldUpdateMode.current = true;
    }
  }, [mode, setMode, onMuiModeChange]);

  // Storybook dark mode addon listener
  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, onSBDarkModeAddonClick);
    return () => {
      channel.removeListener(DARK_MODE_EVENT_NAME, onSBDarkModeAddonClick);
    };
  }, [onSBDarkModeAddonClick]);

  return <></>;
};
