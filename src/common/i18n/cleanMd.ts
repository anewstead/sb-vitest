import { marked } from "marked";

import { cleanHtml } from "./cleanHtml";

/**
 * Clean markdown to safe html\
 * Provided markdown must be pre-loaded to pass to here
 */
export const cleanMd = (markdown: string) => {
  const html = marked(markdown, { async: false });
  return cleanHtml(html);
};
