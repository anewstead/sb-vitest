import React from "react";

import { Grid } from "@mui/material";
import clsx from "clsx";

import type { ITipBoxProps } from "./tipBox.type";

export const TipBox = (props: ITipBoxProps) => {
  const { label, text } = props;

  return (
    <Grid
      container
      spacing={1}
      alignItems="flex-start"
      className={clsx(
        "mt-5 p-4",
        "border border-[var(--mui-palette-primary-main)] rounded"
      )}
    >
      <Grid
        size="auto"
        className={clsx(
          "border border-[var(--mui-palette-primary-main)] rounded",
          "px-2 py-1 mr-2",
          "font-semibold",
          "self-start"
        )}
      >
        {label}
      </Grid>
      <Grid flex={1} className="min-w-0 text-pretty">
        {text}
      </Grid>
    </Grid>
  );
};
