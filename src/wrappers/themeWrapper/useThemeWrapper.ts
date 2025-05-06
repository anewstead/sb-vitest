import { useContext } from "react";

import { ThemeWrapperContext } from "./ThemeWrapperContext";

/**
 * Allows access to the ThemeWrapperContext to switch themes
 */
export const useThemeWrapper = () => {
  const context = useContext(ThemeWrapperContext);
  if (!context) {
    throw new Error("useThemeWrapper must be used within a ThemeWrapper");
  }
  return context;
};
