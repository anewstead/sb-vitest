import React, { useEffect, useRef } from "react";

import { addons } from "@storybook/preview-api";

import { useThemeWrapper } from "@src/wrappers/themeWrapper/useThemeWrapper";

import { getThemeFromUrl, updateUrlWithTheme } from "./themeHelpers";

import type { IThemeName } from "@src/style/theme.type";

const channel = addons.getChannel();

/**
 * Component to sync app theme and Storybook theme Should be added inside
 * storybooks preview themewrapper context Which allows it to handle events from
 * both Storybook and app context
 *
 *     <StoryBookPreviewContainer>
 *       <ThemeWrapper>
 *         <ThemeSyncSbTheme />
 *         {children}
 *       </ThemeWrapper>
 *     </StoryBookPreviewContainer>;
 */
export const SyncSbMuiTheme = () => {
  const { currentTheme, setCurrentTheme } = useThemeWrapper();
  const themeHasInited = useRef(false);
  const shouldUpdateTheme = useRef(true);

  // Initial sync and theme changes
  useEffect(() => {
    if (!themeHasInited.current) {
      // On first mount, sync from URL to MUI
      const { urlTheme, isValid } = getThemeFromUrl();
      if ((isValid && urlTheme !== currentTheme) || !isValid) {
        shouldUpdateTheme.current = false;
        setCurrentTheme(urlTheme);
      }
      themeHasInited.current = true;
      return;
    }

    // After initialization, handle theme changes
    if (shouldUpdateTheme.current) {
      // Theme changed from MUI, update URL
      updateUrlWithTheme(currentTheme);
    } else {
      // Theme changed from URL, reset flag
      shouldUpdateTheme.current = true;
    }
  }, [currentTheme, setCurrentTheme]);

  // Listen for all Storybook global updates
  useEffect(() => {
    const handleStorybookUpdate = (event: {
      globals: Record<string, unknown>;
    }) => {
      // If theme is in the globals, handle it
      if ("theme" in event.globals) {
        const newTheme = event.globals.theme as IThemeName;
        if (newTheme !== currentTheme) {
          shouldUpdateTheme.current = false;
          setCurrentTheme(newTheme);
        }
      } else {
        // For other global updates, re-initialize theme from URL
        const { urlTheme, isValid } = getThemeFromUrl();
        if (isValid && urlTheme !== currentTheme) {
          shouldUpdateTheme.current = false;
          setCurrentTheme(urlTheme);
        }
      }
    };

    channel.on("updateGlobals", handleStorybookUpdate);
    return () => {
      channel.off("updateGlobals", handleStorybookUpdate);
    };
  }, [currentTheme, setCurrentTheme]);

  return <></>;
};
