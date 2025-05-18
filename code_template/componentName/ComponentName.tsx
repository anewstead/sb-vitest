import React from "react";

import { Box } from "@mui/material";
import clsx from "clsx";

import { EXAMPLE_CONST } from "./componentName.const";

import type { IComponentNameProps } from "./componentName.type";

export const ComponentName = (props: IComponentNameProps) => {
  const { exampleText, exampleFunction } = props;

  return (
    <Box className={clsx("p-4 bg-[var(--mui-palette-primary-main)]")}>
      <p>{EXAMPLE_CONST}</p>
      <button onClick={exampleFunction}>{exampleText}</button>
    </Box>
  );
};
