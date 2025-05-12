import React from "react";

import Button from "@mui/material/Button";

import styles from "./myButton.module.scss";

import type { IMyButtonProps } from "./myButton.type";

export const MyButton = (props: IMyButtonProps) => {
  const {
    secondary = false,
    size = "medium",
    backgroundColor,
    label,
    onClick,
  } = props;

  return (
    <Button
      variant={secondary ? "outlined" : "contained"}
      size={size}
      style={{ backgroundColor }}
      className={styles.myButton}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
