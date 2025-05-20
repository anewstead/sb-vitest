import React from "react";

import clsx from "clsx";

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
    <div className="flex items-center gap-4">
      <span className="text-sm text-[var(--mui-palette-text-secondary)]">
        {`${welcomeText} ${user?.name ?? ""}`}
      </span>
      <MyButton size="small" onClick={onLogout} label={logoutText} />
    </div>
  );

  const loggedOutContent = (
    <div className="flex items-center gap-4">
      <MyButton size="small" onClick={onLogin} label={loginText} />
      <MyButton
        secondary
        size="small"
        onClick={onCreateAccount}
        label={signupText}
      />
    </div>
  );

  return (
    <div
      className={clsx(
        "flex justify-between items-center p-3",
        "border-t border-b border-[var(--mui-palette-divider)]"
      )}
    >
      <div className="flex items-center gap-2">
        <img src={logo} alt="Acme Logo" />
        <h1 className="font-bold text-2xl">Acme</h1>
      </div>
      {user ? loggedInContent : loggedOutContent}
    </div>
  );
};
