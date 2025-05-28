import React from "react";

import clsx from "clsx";

import { EXAMPLE_CONST } from "./componentName.const";

import type { IComponentNameProps } from "./componentName.type";

export const ComponentName = (props: IComponentNameProps) => {
  const { exampleText, exampleFunction } = props;

  return (
    <div className={clsx("bg-[var(--mui-palette-primary-main)] p-4")}>
      <p>{EXAMPLE_CONST}</p>
      <button onClick={exampleFunction}>{exampleText}</button>
    </div>
  );
};
