import React from "react";

import { ThemeModeButtons } from "@src/components/atom/themeModeButtons/ThemeModeButtons";
import { ThemeSelector } from "@src/components/atom/themeSelector/ThemeSelector";

export const ThemeControls = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-1/2 sm:w-5/12 md:w-1/3">
        <ThemeSelector />
      </div>
      <div>
        <ThemeModeButtons />
      </div>
    </div>
  );
};
