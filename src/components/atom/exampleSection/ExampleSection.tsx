import React from "react";

import { MyButton } from "@src/components/atom/myButton/MyButton";

import styles from "./exampleSection.module.scss";

import type { IExampleSectionProps } from "./exampleSection.type";

export const ExampleSection = (props: IExampleSectionProps) => {
  const { buttonLabel, exampleText, onChangeText } = props;

  return (
    <div className={styles.exampleSection}>
      <p data-testid="example-text">{exampleText}</p>
      <MyButton secondary label={buttonLabel} onClick={onChangeText} />
    </div>
  );
};
