import React, { useEffect, useRef } from "react";

import { addons } from "@storybook/preview-api";

import { useThemeWrapper } from "@src/app/wrappers/themeWrapper/useThemeWrapper";

import { getThemeFromUrl, updateUrlWithTheme } from "./themeHelpers";

import type { IThemeName } from "@src/common/style/theme.type";

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

  // Listen for Storybook theme changes (works in both docs and story pages)
  useEffect(() => {
    const handleStorybookThemeChange = (event: {
      globals: { theme: IThemeName };
    }) => {
      if (event.globals.theme !== currentTheme) {
        shouldUpdateTheme.current = false;
        setCurrentTheme(event.globals.theme);
      }
    };

    channel.on("updateGlobals", handleStorybookThemeChange);
    return () => {
      channel.off("updateGlobals", handleStorybookThemeChange);
    };
  }, [currentTheme, setCurrentTheme]);

  return <></>;
};
