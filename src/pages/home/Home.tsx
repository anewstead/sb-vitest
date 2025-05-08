import React from "react";

import { useTranslation } from "react-i18next";

import viewportIcon from "@src/assets/viewport-icon.svg";
import { ExampleSection } from "@src/components/atom/exampleSection/ExampleSection";
import { TipBox } from "@src/components/atom/tipBox/TipBox";
import { Header } from "@src/components/compound/header/Header";
import { useContent } from "@src/i18n/useContent";
import { useAppDispatch, useAppSelector } from "@src/state/store";
import { cleanHtml } from "@src/utils/cleanHtml";

import {
  handleChangeText,
  handleCreateAccount,
  handleLogin,
  handleLogout,
} from "./home.helper";

import styles from "./home.module.scss";

import type { IHomeProps } from "./home.type";

export const Home = (props: IHomeProps) => {
  const { user } = props;

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const reduxText = useAppSelector((state) => {
    return state.home.example;
  });

  const content = useContent("home.md");

  const viewportTip = cleanHtml(
    t("home:viewportTip", {
      icon: `<img src="${viewportIcon}" alt="viewport icon" />`,
    })
  );

  return (
    <div className={styles.home}>
      <Header
        loginBarProps={{
          user: user,
          onLogin: handleLogin,
          onLogout: handleLogout,
          onCreateAccount: handleCreateAccount,
          welcomeText: t("common:welcome"),
          loginText: t("common:login"),
          logoutText: t("common:logout"),
          signupText: t("common:signup"),
        }}
      />

      <section className={styles.content}>
        <h2>{t("home:pagesInStorybook")}</h2>

        <ExampleSection
          buttonLabel={t("home:changeText")}
          exampleText={reduxText}
          onChangeText={() => {
            handleChangeText(dispatch);
          }}
        />

        <div data-testid="content">{content}</div>
      </section>

      <TipBox label={t("common:tip")} text={viewportTip} />
    </div>
  );
};
