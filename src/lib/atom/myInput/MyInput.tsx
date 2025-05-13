import React from "react";

import { FormControl, FormLabel, Input } from "@mui/material";

import type { IMyInputProps } from "./myInput.type";

export const MyInput = (props: IMyInputProps) => {
  const {
    labelText,
    initialValue,
    onChange,
    id = "input",
    type = "text",
    placeholder,
    required = false,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Add validation for tel type
    if (type === "tel") {
      // Only allow numbers, parentheses, spaces, dashes, and plus sign
      value = value.replace(/[^0-9()\s-+]/g, "");
    }

    onChange(value);
  };

  return (
    <FormControl fullWidth>
      <FormLabel htmlFor={id}>{labelText}</FormLabel>
      <Input
        id={id}
        name={id}
        value={initialValue}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        required={required}
        size="small"
        inputProps={{
          "aria-label": labelText,
          "data-testid": id,
        }}
      />
    </FormControl>
  );
};
