import type { Theme } from "@mui/material/styles";
import type { IThemeName } from "@src/style/theme.type";
import type { PropsWithChildren } from "react";

export type IThemeBaseProps = PropsWithChildren & {
  initialTheme?: Theme | IThemeName;
};

// what gets passed into the Context.Provider
export type IThemeWrapperContextType = {
  currentTheme: IThemeName;
  setCurrentTheme: (theme: IThemeName) => void;
};
