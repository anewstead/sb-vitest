import { createContext } from "react";

import type { ThemeName } from "@src/style/theme";

type ThemeWrapperContextType = {
  currentTheme: ThemeName;
  setCurrentTheme: (theme: ThemeName) => void;
};

const ThemeWrapperContext = createContext<ThemeWrapperContextType | undefined>(
  undefined
);

export { ThemeWrapperContext };
