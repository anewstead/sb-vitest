import React from "react";

import { TipBox } from "@src/lib/atom/tipBox/TipBox";
import { Header } from "@src/lib/organism/header/Header";

import styles from "./contentPage.module.scss";

import type { IContentPageProps } from "./contentPage.type";

export const ContentPage = (props: IContentPageProps) => {
  const { title, content, tipBoxProps, headerProps } = props;

  return (
    <div className={styles.contentPage}>
      <div className={styles.header}>
        <Header {...headerProps} />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>

        <div>{content}</div>

        <TipBox {...tipBoxProps} />
      </div>
    </div>
  );
};
