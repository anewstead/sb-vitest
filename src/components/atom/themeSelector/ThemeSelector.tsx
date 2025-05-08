import React from "react";

import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { allThemes } from "@src/style/theme";
import { useThemeWrapper } from "@src/wrappers/themeWrapper/useThemeWrapper";

import type { SelectChangeEvent } from "@mui/material/Select";
import type { IThemeName } from "@src/style/theme.type";

export const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme } = useThemeWrapper();

  const handleThemeChange = (event: SelectChangeEvent<IThemeName>) => {
    const newTheme = event.target.value;
    setCurrentTheme(newTheme);
  };

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, padding: 1 }}>
      <Grid size={7}>
        <FormControl size="small" sx={{ display: "flex", flexGrow: 1 }}>
          <InputLabel id="theme-select-label">Theme</InputLabel>
          <Select
            labelId="theme-select-label"
            id="theme-select"
            value={currentTheme}
            label="Theme"
            onChange={handleThemeChange}
          >
            {Object.entries(allThemes).map(([name]) => {
              return (
                <MenuItem key={name} value={name}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
