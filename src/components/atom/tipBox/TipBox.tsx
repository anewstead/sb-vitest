import React from "react";

import clsx from "clsx";

import type { ITipBoxProps } from "./tipBox.type";

export const TipBox = (props: ITipBoxProps) => {
  const { label, text } = props;

  return (
    <div
      className={clsx(
        "mt-5 flex items-start gap-2 p-4",
        "rounded-lg border border-[var(--mui-palette-primary-main)]"
      )}
    >
      <span
        className={clsx(
          "rounded-md border border-[var(--mui-palette-primary-main)]",
          "shrink-0 px-3 py-1 font-semibold"
        )}
      >
        {label}
      </span>
      <div className="flex-1 text-pretty">{text}</div>
    </div>
  );
};
