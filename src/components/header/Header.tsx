import styles from "./header.module.css";

import React from "react";

import logo from "@src/assets/acme-logo.svg";
import { Button } from "@src/components/button/Button";

import type { HeaderProps } from "./header.type";

export const Header = (props: HeaderProps) => {
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
      <Button size="small" onClick={onLogout} label={logoutText} />
    </>
  );

  const loggedOutContent = (
    <>
      <Button size="small" onClick={onLogin} label={loginText} />
      <Button
        secondary
        size="small"
        onClick={onCreateAccount}
        label={signupText}
      />
    </>
  );

  return (
    <header>
      <div className={styles.header}>
        <div>
          <img src={logo} alt="Acme Logo" />
          <h1>Acme</h1>
        </div>
        <div>{user ? loggedInContent : loggedOutContent}</div>
      </div>
    </header>
  );
};
