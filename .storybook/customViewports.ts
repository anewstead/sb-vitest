/**
 * These are sample screen sizes\
 * Not design breakpoints
 */

/**
 * Viewport type follows viewport addon (included in addon-essentials)\
 * https://storybook.js.org/docs/essentials/viewport#add-new-devices\
 * Hard to locate and import type directly from there!
 */
export type IViewport = {
  name: string;
  styles: {
    width: string; // e.g. '640px'
    height: string;
  };
  type: "mobile" | "tablet" | "desktop" | "other";
};

export type ICustomViewports = {
  xs: IViewport;
  sm: IViewport;
  md: IViewport;
  lg: IViewport;
  xl: IViewport;
};

/**
 * Custom sizes represent average/typical screen size by device group\
 * Do not use actual screen sizes of specific devices
 */
export const customViewports: ICustomViewports = {
  xs: {
    name: "Small Mobile (xs)",
    styles: {
      width: "360px",
      height: "660px",
    },
    type: "mobile",
  },
  sm: {
    name: "Mobile (sm)",
    styles: {
      width: "410px",
      height: "820px",
    },
    type: "mobile",
  },
  md: {
    name: "Tablet (md)",
    styles: {
      width: "760px",
      height: "1020px",
    },
    type: "tablet",
  },
  lg: {
    name: "Laptop (lg)",
    styles: {
      width: "1280px",
      height: "720px",
    },
    type: "desktop",
  },
  xl: {
    name: "Desktop (xl)",
    styles: {
      width: "1440px",
      height: "900px",
    },
    type: "desktop",
  },
};
