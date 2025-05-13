import React from "react";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useThemeWrapper } from "@src/app/wrappers/themeWrapper/useThemeWrapper";
import { allThemes } from "@src/common/style/theme";
import { MySelect } from "@src/lib/atom/mySelect/MySelect";

import type { IThemeName } from "@src/common/style/theme.type";
import type { IMySelectItem } from "@src/lib/atom/mySelect/mySelect.type";

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
    <Grid container spacing={2} sx={{ flexGrow: 1, padding: 1 }}>
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
          sx={{
            bgcolor: "primary.main",
            borderRadius: 1,
            borderColor: "primary.dark",
            height: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {currentTheme}
        </Box>
      </Grid>
    </Grid>
  );
};
