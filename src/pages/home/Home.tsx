import styles from "./home.module.css";

import React from "react";

import { useTranslation } from "react-i18next";

import viewportIcon from "@src/assets/viewport-icon.svg";
import { Button } from "@src/components/button/Button";
import { Header } from "@src/components/header/Header";
import { useMarkdown } from "@src/hooks/useMarkdown";
import { useAppDispatch, useAppSelector } from "@src/state/store";

import {
  handleChangeText,
  handleCreateAccount,
  handleLogin,
  handleLogout,
} from "./home.helper";

import type { HomeProps } from "./home.type";

export const Home = (props: HomeProps) => {
  const { user } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const exampleText = useAppSelector((state) => {
    return state.home.example;
  });
  const { mdContent, mdLoading, mdLoadError } = useMarkdown("home");

  const onHandleChangeText = () => {
    handleChangeText(dispatch);
  };

  return (
    <article className={styles.home}>
      <Header
        user={user}
        welcomeText={t("common:welcome")}
        loginText={t("common:login")}
        logoutText={t("common:logout")}
        signupText={t("common:signup")}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onCreateAccount={handleCreateAccount}
      />

      <section className={styles.homeContent}>
        <h2>{t("home:pagesInStorybook")}</h2>

        <div className={styles.exampleSection}>
          <p>{t("home:exampleTextFromRedux", { text: exampleText })}</p>
          <Button
            secondary
            label={t("home:changeText")}
            onClick={onHandleChangeText}
          />
        </div>

        {mdLoading ? (
          <div>{t("common:loading")}</div>
        ) : mdLoadError ? (
          <div>{t("common:errorLoading", { error: mdLoadError.message })}</div>
        ) : (
          mdContent
        )}
        <div className={styles.tipWrapper}>
          {t("home:viewportTip", {
            icon: <img src={viewportIcon} alt={t("home:viewportIconAlt")} />,
          })}
        </div>
      </section>
    </article>
  );
};
