import React from "react";

import { Grid } from "@mui/material";

import { LoginBar } from "@src/components/molecule/loginBar/LoginBar";
import { ThemeControls } from "@src/components/molecule/themecontrols/ThemeControls";

import type { IHeaderProps } from "./header.type";

export const Header = (props: IHeaderProps) => {
  const { loginBarProps } = props;
  return (
    <Grid container direction="column" spacing={2} component="header">
      <Grid>
        <ThemeControls />
      </Grid>
      <Grid>
        <LoginBar {...loginBarProps} />
      </Grid>
    </Grid>
  );
};
