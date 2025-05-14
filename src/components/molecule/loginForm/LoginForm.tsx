import React from "react";

import { Grid } from "@mui/material";

import { MyButton } from "@src/components/atom/myButton/MyButton";
import { MyInput } from "@src/components/atom/myInput/MyInput";

import type { ILoginFormProps } from "./loginForm.type";

export const LoginForm = (props: ILoginFormProps) => {
  const {
    emailLabel,
    emailValue,
    emailError,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    passwordLabel,
    passwordValue,
    passwordError,
  } = props;

  return (
    <form onSubmit={onSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid size={12}>
          <MyInput
            labelText={emailLabel}
            type="email"
            id="email"
            initialValue={emailValue}
            onChange={onEmailChange}
            required
            errorText={emailError}
          />
        </Grid>
        <Grid size={12}>
          <MyInput
            labelText={passwordLabel}
            type="password"
            id="password"
            initialValue={passwordValue}
            onChange={onPasswordChange}
            required
            errorText={passwordError}
          />
        </Grid>
        <Grid size={12}>
          <MyButton label="Login" type="submit" />
        </Grid>
      </Grid>
    </form>
  );
};
