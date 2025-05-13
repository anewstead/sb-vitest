import React from "react";

import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { MyButton } from "@src/components/atom/myButton/MyButton";
import { MyInput } from "@src/components/atom/myInput/MyInput";

import type { LoginFormData } from "./types";

export const LoginPage = () => {
  const { handleSubmit, setValue, watch } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Handle login logic here
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission
    void handleSubmit(onSubmit)(e);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <MyInput
                labelText="Email"
                type="email"
                id="email"
                initialValue={emailValue}
                onChange={(value) => {
                  setValue("email", value);
                }}
                required
              />
            </Grid>
            <Grid size={12}>
              <MyInput
                labelText="Password"
                type="password"
                id="password"
                initialValue={passwordValue}
                onChange={(value) => {
                  setValue("password", value);
                }}
                required
              />
            </Grid>
            <Grid size={12}>
              <MyButton label="Login" type="submit" />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
