import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { validEmail } from "@src/common/utils/zod/validEmail";
import { MyButton } from "@src/components/atom/myButton/MyButton";
import { MyInput } from "@src/components/atom/myInput/MyInput";

const loginSchema = z.object({
  email: validEmail,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ILoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = (data: ILoginFormData) => {
    //TMP log for dev purposes
    console.warn(data);
    // Handle login logic here
  };

  // hook-form validates then calls onSubmit
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
      <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleFormSubmit} noValidate>
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
                error={errors.email?.message}
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
                error={errors.password?.message}
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
