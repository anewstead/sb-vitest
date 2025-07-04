// type for storybook-dark-mode addon localstorage
type ISbDarkModeStore = {
  current: "light" | "dark";
  userHasExplicitlySetTheTheme: boolean;
};

// storybook-dark-mode addon localstorage key
const SB_DM_KEY = "sb-addon-themes-3";

/**
 * Get user's system preferred mode
 */
export const getUserPreferMode = () => {
  if (typeof window === "undefined") {
    return "light";
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

/**
 * LocalStorage:\
 * Storybook mode uses: Light/dark/userHasExplicitlySetTheTheme\
 * To sync to Mui this returns as: Light/dark/system
 */
export const getStorybookMode = () => {
  const getSbDm = localStorage.getItem(SB_DM_KEY);
  if (getSbDm) {
    const sbObj = JSON.parse(getSbDm) as ISbDarkModeStore;
    return sbObj.userHasExplicitlySetTheTheme ? sbObj.current : "system";
  }
  return "system";
};

/**
 * LocalStorage:\
 * When Mui mode change to system we need to tell\
 * Storybook dark mode addon to reflect its equivalent state
 */
export const setSbModeToSystem = (isSystem: boolean) => {
  const getSbDm = localStorage.getItem(SB_DM_KEY);
  if (getSbDm) {
    const systemMode = getUserPreferMode();
    const sbObj = JSON.parse(getSbDm) as ISbDarkModeStore;
    sbObj.userHasExplicitlySetTheTheme = !isSystem;
    sbObj.current = systemMode;
    localStorage.setItem(SB_DM_KEY, JSON.stringify(sbObj));
  }
};
