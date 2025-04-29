import DOMPurify from "dompurify";
import parse from "html-react-parser";

export const sanitizeHTML = (html: string) => {
  return parse(DOMPurify.sanitize(html));
};
