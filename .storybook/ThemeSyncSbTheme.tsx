import React, { useEffect, useRef } from "react";

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
const ThemeSyncSbTheme = () => {
  const { currentTheme, setCurrentTheme } = useThemeWrapper();
  const allowThemeDispatch = useRef(true);

  // Handle theme sync and URL updates
  useEffect(() => {
    const { urlTheme, isValid } = getThemeFromUrl();
    if (!isValid) {
      // handled here and not directly in helpers in order to trigger re-render
      updateUrlWithTheme(urlTheme);
      return;
    }
    // Sync theme between app and URL
    if (currentTheme !== urlTheme) {
      allowThemeDispatch.current = false;
      setCurrentTheme(urlTheme);
    } else {
      allowThemeDispatch.current = true;
    }
  }, [currentTheme, setCurrentTheme]);

  return <></>;
};

export { ThemeSyncSbTheme };
