import React from "react";

import { Box } from "@mui/material";

import { EXAMPLE_CONST } from "./componentName.const";

import styles from "./componentName.module.scss";

import type { IComponentNameProps } from "./componentName.type";

export const ComponentName = (props: IComponentNameProps) => {
  const { exampleText, exampleFunction } = props;

  return (
    <Box className={styles.componentName}>
      <p>{EXAMPLE_CONST}</p>
      <button onClick={exampleFunction}>{exampleText}</button>
    </Box>
  );
};
