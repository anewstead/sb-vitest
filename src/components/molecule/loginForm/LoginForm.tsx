import React from "react";

import { MyButton } from "@src/components/atom/myButton/MyButton";
import { MyInput } from "@src/components/atom/myInput/MyInput";

import type { ILoginFormProps } from "./loginForm.type";

export const LoginForm = (props: ILoginFormProps) => {
  const { email, password, onSubmit } = props;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <MyInput {...email} />
      <MyInput {...password} />
      <div className="flex justify-center">
        <div className="w-1/2">
          <MyButton label="Login" type="submit" className="w-full" />
        </div>
      </div>
    </form>
  );
};
