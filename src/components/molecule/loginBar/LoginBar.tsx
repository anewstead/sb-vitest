import React from "react";

import logo from "@src/common/assets/acme-logo.svg";
import { MyButton } from "@src/components/atom/myButton/MyButton";

import styles from "./loginBar.module.scss";

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
    <>
      <span className={styles.welcome}>
        {`${welcomeText} ${user?.name ?? ""}`}
      </span>
      <MyButton size="small" onClick={onLogout} label={logoutText} />
    </>
  );

  const loggedOutContent = (
    <>
      <MyButton size="small" onClick={onLogin} label={loginText} />
      <MyButton
        secondary
        size="small"
        onClick={onCreateAccount}
        label={signupText}
      />
    </>
  );

  return (
    <header>
      <div className={styles.loginBar}>
        <div>
          <img src={logo} alt="Acme Logo" />
          <h1>Acme</h1>
        </div>
        <div>{user ? loggedInContent : loggedOutContent}</div>
      </div>
    </header>
  );
};
