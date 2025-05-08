import React from "react";

import styles from "./tipBox.module.scss";

import type { ITipBoxProps } from "./tipBox.type";

export const TipBox = (props: ITipBoxProps) => {
  const { label, text } = props;

  return (
    <div className={styles.tipWrapper}>
      <span className={styles.tip}>{label}</span>
      {text}
    </div>
  );
};
