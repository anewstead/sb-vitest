import React from "react";

import { LoginBar } from "@src/lib/molecule/loginBar/LoginBar";
import { ThemeControls } from "@src/lib/molecule/themecontrols/ThemeControls";

import styles from "./header.module.scss";

import type { IHeaderProps } from "./header.type";

export const Header = (props: IHeaderProps) => {
  const { loginBarProps } = props;
  return (
    <div className={styles.header}>
      <ThemeControls />
      <LoginBar {...loginBarProps} />
    </div>
  );
};
