import React from "react";

import { Grid } from "@mui/material";

import { MyButton } from "@src/components/atom/myButton/MyButton";

import type { IExampleReduxProps } from "./exampleRedux.type";

/**
 * ExampleRedux component only used to illustrate the use of Redux at page level
 */
export const ExampleRedux = (props: IExampleReduxProps) => {
  const { buttonLabel, exampleText, onChangeText } = props;

  return (
    <Grid
      container
      spacing={2}
      className="my-4 p-4 border rounded-xl [border-color:var(--mui-palette-text-primary)]"
    >
      <Grid size={12}>
        <p data-testid="example-text">{exampleText}</p>
      </Grid>
      <Grid size={12}>
        <MyButton secondary label={buttonLabel} onClick={onChangeText} />
      </Grid>
    </Grid>
  );
};
