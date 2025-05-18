import React from "react";

import { TextField } from "@mui/material";

import type { IMyInputProps } from "./myInput.type";

export const MyInput = (props: IMyInputProps) => {
  const {
    label,
    value,
    onChange,
    id,
    type = "text",
    placeholder,
    required = false,
    helperText,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    onChange(currentValue);
  };

  return (
    <TextField
      id={id}
      name={id}
      label={label}
      value={value}
      onChange={handleChange}
      type={type}
      placeholder={placeholder}
      required={required}
      error={!!helperText}
      helperText={helperText}
      size="small"
      fullWidth
    />
  );
};
