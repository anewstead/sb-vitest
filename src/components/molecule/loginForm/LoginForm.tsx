import React from "react";

import { Grid } from "@mui/material";

import { MyButton } from "@src/components/atom/myButton/MyButton";
import { MyInput } from "@src/components/atom/myInput/MyInput";

import type { ILoginFormProps } from "./loginForm.type";

export const LoginForm = (props: ILoginFormProps) => {
  const { email, password, onSubmit } = props;

  return (
    <form onSubmit={onSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid size={12}>
          <MyInput {...email} />
        </Grid>
        <Grid size={12}>
          <MyInput {...password} />
        </Grid>
        <Grid size={12}>
          <MyButton label="Login" type="submit" />
        </Grid>
      </Grid>
    </form>
  );
};
