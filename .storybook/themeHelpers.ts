// type for storybook-dark-mode addon localstorage
type ISbDarkModeStore = {
  current: "light" | "dark";
  userHasExplicitlySetTheTheme: boolean;
};

// storybook-dark-mode addon localstorage key
const SB_DM_KEY = "sb-addon-themes-3";

/**
 * Get users system preferred mode
 */
export const getUserPreferMode = () => {
  if (typeof window === "undefined") {
    return "light";
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

/**
 * Storybook mode uses:\
 *
 * - Light/dark & userHasExplicitlySetTheTheme\
 *   To sync to Mui this maps it to:\
 * - Light/dark/system
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
 * When Mui mode change to system we need to tell\
 * Storybook to reflect the equivalent state
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
