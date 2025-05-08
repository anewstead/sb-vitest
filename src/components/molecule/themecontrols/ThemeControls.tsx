import React from "react";

import { ThemeModeButtons } from "@src/components/atom/themeModeButtons/ThemeModeButtons";
import { ThemeSelector } from "@src/components/atom/themeSelector/ThemeSelector";

import styles from "./themeControls.module.scss";

export const ThemeControls = () => {
  return (
    <div>
      <div className={styles.themeControls}>
        <div className={styles.themeSelector}>
          <ThemeSelector />
        </div>
        <div className={styles.themeButtons}>
          <ThemeModeButtons />
        </div>
      </div>
    </div>
  );
};
