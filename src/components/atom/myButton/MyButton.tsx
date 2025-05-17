import React from "react";

import { Button } from "@mui/material";
import clsx from "clsx";

import type { IMyButtonProps } from "./myButton.type";

export const MyButton = (props: IMyButtonProps) => {
  const {
    secondary = false,
    size = "medium",
    label,
    onClick,
    type = "button",
    className,
  } = props;

  return (
    <Button
      variant={secondary ? "outlined" : "contained"}
      size={size}
      className={clsx(
        "normal-case",
        "hover:-translate-y-0.5 hover:transition-transform hover:duration-200 hover:ease-in-out",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {label}
    </Button>
  );
};
