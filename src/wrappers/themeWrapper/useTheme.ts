import { useContext } from "react";

import { ThemeWrapperContext } from "./ThemeWrapperContext";

export const useTheme = () => {
  const context = useContext(ThemeWrapperContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeWrapper");
  }
  return context;
};
