import React from "react";

import { Button } from "@mui/material";
import clsx from "clsx";

import styles from "./myButton.module.scss";

import type { IMyButtonProps } from "./myButton.type";

export const MyButton: React.FC<IMyButtonProps> = (props) => {
  const {
    secondary = false,
    size = "medium",
    backgroundColor,
    label,
    onClick,
    type = "button",
    className,
  } = props;

  return (
    <Button
      variant={secondary ? "outlined" : "contained"}
      size={size}
      style={{ backgroundColor }}
      className={clsx(styles.myButton, className)}
      onClick={onClick}
      type={type}
    >
      {label}
    </Button>
  );
};
