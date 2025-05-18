import React from "react";

import { Grid } from "@mui/material";
import clsx from "clsx";

import { TipBox } from "@src/components/atom/tipBox/TipBox";
import { Header } from "@src/components/organism/header/Header";

import type { IContentPageProps } from "./contentPage.type";

export const ContentPage = (props: IContentPageProps) => {
  const { title, content, tipBoxProps, headerProps } = props;

  return (
    <Grid container direction="column" alignItems="center" className="p-4">
      <Grid className="w-full">
        <Header {...headerProps} />
      </Grid>

      <Grid
        container
        size={{ xs: 12, md: 10, xl: 8 }}
        className={clsx(
          "mt-4 p-4 rounded-2xl",
          "bg-[rgb(var(--mui-palette-common-backgroundChannel)/0.1)] "
        )}
      >
        <Grid className="w-full">
          <h2>{title}</h2>
        </Grid>

        <Grid>{content}</Grid>

        <Grid className="w-full">
          <TipBox {...tipBoxProps} />
        </Grid>
      </Grid>
    </Grid>
  );
};
