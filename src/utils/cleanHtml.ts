import DOMPurify from "dompurify";
import parse from "html-react-parser";

/**
 * Clean html to safe html\
 * Provided html must be pre-loaded to pass to here
 */
export const cleanHtml = (html: string) => {
  const sanitized = DOMPurify.sanitize(html);
  return parse(sanitized);
};
