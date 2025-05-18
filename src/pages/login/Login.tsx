import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoginForm } from "@src/components/molecule/loginForm/LoginForm";
import { validEmail } from "@src/utils/zod/validEmail";

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
      className="flex h-full items-center justify-center"
    >
      <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <LoginForm
          email={{
            id: "email",
            label: "Email",
            value: emailValue,
            helperText: errors.email?.message,
            onChange: (value: string) => {
              setValue("email", value);
            },
          }}
          password={{
            id: "password",
            label: "Password",
            value: passwordValue,
            helperText: errors.password?.message,
            onChange: (value: string) => {
              setValue("password", value);
            },
          }}
          onSubmit={handleFormSubmit}
        />
      </Grid>
    </Grid>
  );
};
