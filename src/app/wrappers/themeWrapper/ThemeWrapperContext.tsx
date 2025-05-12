import { createContext } from "react";

import type { IThemeWrapperContextType } from "./themeWrapper.type";

const ThemeWrapperContext = createContext<IThemeWrapperContextType | undefined>(
  undefined
);

export { ThemeWrapperContext };
