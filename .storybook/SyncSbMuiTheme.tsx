import React, { useCallback, useEffect, useRef } from "react";

import { useThemeWrapper } from "@src/wrappers/themeWrapper/useThemeWrapper";

import { getThemeFromUrl, updateUrlWithTheme } from "./themeHelpers";

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

  // Handle URL changes from Storybook
  const onUrlThemeChange = useCallback(() => {
    const { urlTheme, isValid } = getThemeFromUrl();
    if (isValid && urlTheme !== currentTheme) {
      shouldUpdateTheme.current = false;
      setCurrentTheme(urlTheme);
    } else {
      shouldUpdateTheme.current = true;
    }
  }, [currentTheme, setCurrentTheme]);

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

  // Listen for URL changes
  useEffect(() => {
    window.addEventListener("popstate", onUrlThemeChange);
    return () => {
      window.removeEventListener("popstate", onUrlThemeChange);
    };
  }, [onUrlThemeChange]);

  return <></>;
};
