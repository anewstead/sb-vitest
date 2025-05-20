import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
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
    <div className="flex h-full items-center justify-center">
      <div className="w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
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
      </div>
    </div>
  );
};
