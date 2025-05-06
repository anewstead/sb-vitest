import { useContext } from "react";

import { ThemeWrapperContext } from "./ThemeWrapperContext";

export const useThemeWrapper = () => {
  const context = useContext(ThemeWrapperContext);
  if (!context) {
    throw new Error("useThemeWrapper must be used within a ThemeWrapper");
  }
  return context;
};
