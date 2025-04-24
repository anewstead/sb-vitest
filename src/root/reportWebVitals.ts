/* v8 ignore start */
import { onCLS, onFCP, onLCP, onTTFB } from "web-vitals";

/**
 * If you want to measuring performance in your app,\
 * To log results e.g:\
 * `reportWebVitals(console.log)`\
 * Or send to analytics endpoint, learn more:\
 * https://github.com/GoogleChrome/web-vitals
 */
export const reportWebVitals = (onPerfEntry?: () => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};
