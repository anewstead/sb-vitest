import React from "react";

import { Grid } from "@mui/material";

import logo from "@src/assets/acme-logo.svg";
import { MyButton } from "@src/components/atom/myButton/MyButton";

import type { ILoginBarProps } from "./loginBar.type";

export const LoginBar = (props: ILoginBarProps) => {
  const {
    user,
    onLogin,
    onLogout,
    onCreateAccount,
    welcomeText,
    loginText,
    logoutText,
    signupText,
  } = props;

  const loggedInContent = (
    <Grid container spacing={2} alignItems="center">
      <Grid className="mr text-sm text-[var(--mui-palette-text-secondary)]">
        {`${welcomeText} ${user?.name ?? ""}`}
      </Grid>
      <Grid>
        <MyButton size="small" onClick={onLogout} label={logoutText} />
      </Grid>
    </Grid>
  );

  const loggedOutContent = (
    <Grid container spacing={2} alignItems="center">
      <Grid>
        <MyButton size="small" onClick={onLogin} label={loginText} />
      </Grid>
      <Grid>
        <MyButton
          secondary
          size="small"
          onClick={onCreateAccount}
          label={signupText}
        />
      </Grid>
    </Grid>
  );

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className="border-t border-b border-[var(--mui-palette-divider)] p-3"
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid>
          <img src={logo} alt="Acme Logo" />
        </Grid>
        <Grid>
          <h1 className="font-bold text-2xl">Acme</h1>
        </Grid>
      </Grid>
      <Grid>{user ? loggedInContent : loggedOutContent}</Grid>
    </Grid>
  );
};
