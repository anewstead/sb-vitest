import { addons } from "@storybook/preview-api";

import { allThemes, defaultTheme } from "@src/style/theme";

import type { IThemeName } from "@src/style/theme.type";

/**
 * Get theme from url Set by sb-addon-theme withThemeFromJSXProvider Returns
 * default theme if no theme is specified in URL
 */
export const getThemeFromUrl = (): {
  urlTheme: IThemeName;
  isValid: boolean;
} => {
  const urlParams = new URLSearchParams(window.location.search);
  const globals = urlParams.get("globals") ?? "";
  const parsed = parseUrlGlobals(globals);
  const themeName = parsed.theme as IThemeName | undefined;
  if (themeName && Object.keys(allThemes).includes(themeName)) {
    return { urlTheme: themeName, isValid: true };
  }
  if (themeName) {
    console.warn(
      `Invalid theme "${themeName}" in URL. Available themes: ${Object.keys(
        allThemes
      ).join(", ")}. Using default theme "${defaultTheme.name}".`
    );
  }
  return { urlTheme: defaultTheme.name, isValid: false };
};

// Utility functions for parsing and stringifying globals
export function parseUrlGlobals(globals: string): Record<string, string> {
  if (!globals) {
    return {};
  }
  return Object.fromEntries(
    globals.split(";").map((pair) => {
      const [key, value] = pair.split(":");
      return [key, value];
    })
  );
}

export function stringifyUrlGlobals(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      return `${key}:${value}`;
    })
    .join(";");
}

export function updateUrlWithTheme(newTheme: IThemeName) {
  const channel = addons.getChannel();
  const topWindow = window.top ?? window;
  const parentUrl = new URL(topWindow.location.href);
  const params = new URLSearchParams(parentUrl.search);
  const globals = params.get("globals") ?? "";
  const parsed = parseUrlGlobals(globals);
  parsed.theme = newTheme;
  params.set("globals", stringifyUrlGlobals(parsed));
  const newUrl = `${parentUrl.origin + parentUrl.pathname}?${params.toString()}`;
  topWindow.history.replaceState({}, "", newUrl);
  channel.emit("updateGlobals", { globals: { theme: newTheme } });
}
