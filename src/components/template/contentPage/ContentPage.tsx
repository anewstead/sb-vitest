import React from "react";

import clsx from "clsx";

import { TipBox } from "@src/components/atom/tipBox/TipBox";
import { Header } from "@src/components/organism/header/Header";

import type { IContentPageProps } from "./contentPage.type";

export const ContentPage = (props: IContentPageProps) => {
  const { title, content, tipBoxProps, headerProps } = props;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full">
        <Header {...headerProps} />
      </div>

      <div
        className={clsx(
          "mt-4 w-full rounded-2xl p-4 md:w-5/6 xl:w-2/3",
          "bg-[rgb(var(--mui-palette-common-backgroundChannel)/0.1)]"
        )}
      >
        <h2>{title}</h2>

        {content}

        <TipBox {...tipBoxProps} />
      </div>
    </div>
  );
};
