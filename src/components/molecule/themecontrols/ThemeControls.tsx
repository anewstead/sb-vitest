import React from "react";

import { Grid } from "@mui/material";

import { ThemeModeButtons } from "@src/components/atom/themeModeButtons/ThemeModeButtons";
import { ThemeSelector } from "@src/components/atom/themeSelector/ThemeSelector";

export const ThemeControls = () => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid size={{ xs: 6, sm: 5, md: 4 }}>
        <ThemeSelector />
      </Grid>
      <Grid>
        <ThemeModeButtons />
      </Grid>
    </Grid>
  );
};
