import React from "react";

import clsx from "clsx";

import type { ITipBoxProps } from "./tipBox.type";

export const TipBox = (props: ITipBoxProps) => {
  const { label, text } = props;

  return (
    <div
      className={clsx(
        "mt-5 p-4 flex items-start gap-2",
        "border border-[var(--mui-palette-primary-main)] rounded-lg"
      )}
    >
      <span
        className={clsx(
          "border border-[var(--mui-palette-primary-main)] rounded-md",
          "px-3 py-1 font-semibold shrink-0"
        )}
      >
        {label}
      </span>
      <div className="text-pretty flex-1">{text}</div>
    </div>
  );
};
