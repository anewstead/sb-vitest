import React from "react";

import { LoginBar } from "@src/components/molecule/loginBar/LoginBar";
import { ThemeControls } from "@src/components/molecule/themecontrols/ThemeControls";

import type { IHeaderProps } from "./header.type";

export const Header = (props: IHeaderProps) => {
  const { loginBarProps } = props;
  return (
    <header className="flex flex-col gap-4">
      <ThemeControls />
      <LoginBar {...loginBarProps} />
    </header>
  );
};
