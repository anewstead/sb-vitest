import styles from "./home.module.css";

import React from "react";

import { useTranslation } from "react-i18next";

import viewportIcon from "@src/assets/viewport-icon.svg";
import { Button } from "@src/components/button/Button";
import { Header } from "@src/components/header/Header";
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
        <h2>Pages in Storybook</h2>

        <div className={styles.exampleSection}>
          <p>Example Text from Redux: {exampleText}</p>
          <Button secondary label="Change Text" onClick={onHandleChangeText} />
        </div>

        <p>
          Building UIs with a{" "}
          <a
            href="https://componentdriven.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>component-driven</strong>
          </a>{" "}
          process starting with atomic components and ending with pages.
        </p>
        <p>
          Get a guided tutorial on component-driven development at{" "}
          <a
            href="https://storybook.js.org/tutorials/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Storybook tutorials
          </a>
          . Read more in the{" "}
          <a
            href="https://storybook.js.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            docs
          </a>
          .
        </p>
        <div className={styles.tipWrapper}>
          <span className={styles.tip}>Tip</span> Adjust the width of the canvas
          with the <img src={viewportIcon} alt="Viewport icon" /> Viewports
          addon in the toolbar
        </div>
      </section>
    </article>
  );
};
