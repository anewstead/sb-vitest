import React from "react";

import AutoMode from "@mui/icons-material/AutoMode";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useColorScheme } from "@mui/material/styles";

import type { IThemeMode } from "@src/style/theme.type";

export const ThemeModeButtons = () => {
  const { mode, setMode } = useColorScheme();

  const handleMode = (newVal: IThemeMode) => {
    setMode(newVal);
  };

  return (
    <ButtonGroup aria-label="theme buttons" size="small">
      <Button
        variant={mode === "light" ? "contained" : "outlined"}
        onClick={() => {
          handleMode("light");
        }}
        aria-label="light"
      >
        <LightMode />
      </Button>
      <Button
        variant={mode === "system" ? "contained" : "outlined"}
        onClick={() => {
          handleMode("system");
        }}
        aria-label="system"
      >
        <AutoMode />
      </Button>
      <Button
        variant={mode === "dark" ? "contained" : "outlined"}
        onClick={() => {
          handleMode("dark");
        }}
        aria-label="dark"
      >
        <DarkMode />
      </Button>
    </ButtonGroup>
  );
};
