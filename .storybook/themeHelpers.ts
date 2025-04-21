// type for storybook theme localstorage
type ISbDarkModeStore = {
  current: "light" | "dark";
  userHasExplicitlySetTheTheme: boolean;
};

// storybook theme localstorage key
const SB_KEY = "sb-addon-themes-3";

/*
get users system prefered theme
*/
export const getUserPreferTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

/*
storybook theme uses: 
 - light/dark & userHasExplicitlySetTheTheme
to sync to Mui this maps it to:
 - light/dark/system
*/
export const getStorybookTheme = () => {
  const getSB = localStorage.getItem(SB_KEY);
  if (getSB) {
    const sbObj = JSON.parse(getSB) as ISbDarkModeStore;
    return sbObj.userHasExplicitlySetTheTheme ? sbObj.current : "system";
  }
  return "system";
};

/*
when Mui theme change to system we need to tell
storybook to reflect the equivalent state
*/
export const setSbThemeToSystem = (isSystem: boolean) => {
  const getSB = localStorage.getItem(SB_KEY);
  if (getSB) {
    const systemTheme = getUserPreferTheme();
    const sbObj = JSON.parse(getSB) as ISbDarkModeStore;
    sbObj.userHasExplicitlySetTheTheme = !isSystem;
    sbObj.current = systemTheme;
    localStorage.setItem(SB_KEY, JSON.stringify(sbObj));
  }
};
