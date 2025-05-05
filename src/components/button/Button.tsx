import React from "react";

import { Button as MuiButton } from "@mui/material";

import styles from "./button.module.css";

import type { ButtonProps } from "./button.type";

export const Button = (props: ButtonProps) => {
  const {
    secondary = false,
    size = "medium",
    backgroundColor,
    label,
    onClick,
  } = props;

  return (
    <MuiButton
      variant={secondary ? "outlined" : "contained"}
      size={size}
      style={{ backgroundColor }}
      className={styles.button}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};
