import React from "react";

import { Box, Grid } from "@mui/material";
import clsx from "clsx";

import { MySelect } from "@src/components/atom/mySelect/MySelect";
import { allThemes } from "@src/style/theme";
import { useThemeWrapper } from "@src/wrappers/themeWrapper/useThemeWrapper";

import type { IMySelectItem } from "@src/components/atom/mySelect/mySelect.type";
import type { IThemeName } from "@src/style/theme.type";

export const ThemeSelector = () => {
  /**
   * IMPORTANT: This is more for example purposes.\
   * Normally component should be stateless, but in this case the tie in to the
   * useThemeWrapper hook is arguably acceptable because it will only ever do
   * this one thing, and requires no parent param input
   */
  const { currentTheme, setCurrentTheme } = useThemeWrapper();

  const themeItems: IMySelectItem[] = Object.entries(allThemes).map(([key]) => {
    return {
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    };
  });

  const handleThemeChange = (selected: IMySelectItem) => {
    setCurrentTheme(selected.value as IThemeName);
  };

  return (
    <Grid container spacing={2} className="flex-grow p-4">
      <Grid size={7}>
        <MySelect
          id="theme-select"
          labelText="Theme"
          initialValue={currentTheme}
          items={themeItems}
          onChange={handleThemeChange}
        />
      </Grid>
      <Grid size={5}>
        <Box
          data-testid="theme-display"
          className={clsx(
            "h-full flex items-center justify-center",
            "bg-[var(--mui-palette-primary-main)]",
            "border border-[var(--mui-palette-primary-dark)] rounded"
          )}
        >
          {currentTheme}
        </Box>
      </Grid>
    </Grid>
  );
};
