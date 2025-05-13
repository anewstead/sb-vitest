import React from "react";

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import type { IMySelectProps } from "./mySelect.type";
import type { SelectChangeEvent } from "@mui/material";

export const MySelect = (props: IMySelectProps) => {
  const { labelText, initialValue, onChange, items, id = "select" } = props;

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    const selectedItem = items.find((item) => {
      return item.value === selectedValue;
    });
    if (selectedItem) {
      const selected = { value: selectedValue, label: selectedItem.label };
      onChange(selected);
    }
  };

  return (
    <Box>
      <FormControl fullWidth size="small" variant="standard">
        <InputLabel id={`${id}-label`}>{labelText}</InputLabel>
        <Select
          id={id}
          labelId={`${id}-label`}
          value={initialValue}
          onChange={handleChange}
          label={labelText}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
