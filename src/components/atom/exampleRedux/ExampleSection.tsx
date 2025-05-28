import React from "react";

import clsx from "clsx";

import { MyButton } from "@src/components/atom/myButton/MyButton";

import type { IExampleReduxProps } from "./exampleRedux.type";

/**
 * ExampleRedux component only used to illustrate the use of Redux at page level
 */
export const ExampleRedux = (props: IExampleReduxProps) => {
  const { buttonLabel, exampleText, onChangeText } = props;

  return (
    <div
      className={clsx(
        "my-4 rounded-xl border p-4",
        "[border-color:var(--mui-palette-text-primary)]"
      )}
    >
      <div className="mb-4" data-testid="example-text">
        {exampleText}
      </div>
      <div>
        <MyButton secondary label={buttonLabel} onClick={onChangeText} />
      </div>
    </div>
  );
};
