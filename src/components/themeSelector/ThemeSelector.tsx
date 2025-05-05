import React from "react";

import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { allThemes } from "@src/style/theme";
import { useTheme } from "@src/wrappers/themeWrapper/useTheme";

import type { SelectChangeEvent } from "@mui/material/Select";
import type { ThemeName } from "@src/style/theme";

export const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  const handleThemeChange = (event: SelectChangeEvent<ThemeName>) => {
    const newTheme = event.target.value as ThemeName;
    setCurrentTheme(newTheme);
  };

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, padding: 1 }}>
      <Grid size={6}>
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
      <Grid size={6}>
        <Box
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
