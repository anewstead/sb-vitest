import React from "react";

import { MyButton } from "@src/lib/atom/myButton/MyButton";

import styles from "./exampleRedux.module.scss";

import type { IExampleReduxProps } from "./exampleRedux.type";

/**
 * ExampleRedux component only used to illustrate the use of Redux at page level
 */
export const ExampleRedux = (props: IExampleReduxProps) => {
  const { buttonLabel, exampleText, onChangeText } = props;

  return (
    <div className={styles.exampleRedux}>
      <p data-testid="example-text">{exampleText}</p>
      <MyButton secondary label={buttonLabel} onClick={onChangeText} />
    </div>
  );
};
