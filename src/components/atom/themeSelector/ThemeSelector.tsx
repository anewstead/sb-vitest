import React from "react";

import clsx from "clsx";

import { MySelect } from "@src/components/atom/mySelect/MySelect";
import { allThemes } from "@src/style/theme";
import { useThemeWrapper } from "@src/wrappers/themeWrapper/useThemeWrapper";

import type { IMySelectItem } from "@src/components/atom/mySelect/mySelect.type";
import type { IThemeName } from "@src/style/theme.type";

export const ThemeSelector = () => {
  /**
   * IMPORTANT: This is more for example purposes.\
   * Normally component should be stateless, but in this case the tie in to the
   * useThemeWrapper hook is arguably acceptable because it will only ever do
   * this one thing, and requires no parent param input
   */
  const { currentTheme, setCurrentTheme } = useThemeWrapper();

  const themeItems: IMySelectItem[] = Object.entries(allThemes).map(([key]) => {
    return {
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    };
  });

  const handleThemeChange = (selected: IMySelectItem) => {
    setCurrentTheme(selected.value as IThemeName);
  };

  return (
    <div className="flex gap-4">
      <div className="w-7/12">
        <MySelect
          id="theme-select"
          labelText="Theme"
          initialValue={currentTheme}
          items={themeItems}
          onChange={handleThemeChange}
        />
      </div>
      <div
        data-testid="theme-display"
        className={clsx(
          "w-5/12 flex items-center justify-center",
          "bg-[var(--mui-palette-primary-main)]",
          "rounded-md"
        )}
      >
        {currentTheme}
      </div>
    </div>
  );
};
