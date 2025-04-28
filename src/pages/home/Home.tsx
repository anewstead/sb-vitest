import styles from "./home.module.css";

import React from "react";

import viewportIcon from "@src/assets/viewport-icon.svg";
import { Button } from "@src/components/button/Button";
import { Header } from "@src/components/header/Header";
import { homeActions } from "@src/state/home/slice";
import { useAppDispatch, useAppSelector } from "@src/state/store";

import type { HomeProps } from "./home.type";

export const Home = (props: HomeProps) => {
  const { user, onLogin, onLogout, onCreateAccount } = props;
  const dispatch = useAppDispatch();
  const exampleText = useAppSelector((state) => {
    return state.home.example;
  });

  const handleChangeText = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    dispatch(
      homeActions.SET_EXAMPLE_TEXT(
        `New text with random number: ${randomNum.toString()}`
      )
    );
  };

  return (
    <article className={styles.home}>
      <Header
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
        onCreateAccount={onCreateAccount}
      />

      <section className={styles.homeContent}>
        <h2>Pages in Storybook</h2>

        <div className={styles.exampleSection}>
          <p>Example Text from Redux: {exampleText}</p>
          <Button secondary label="Change Text" onClick={handleChangeText} />
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
