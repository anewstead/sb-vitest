import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { cleanHtml } from "@src/utils/cleanHtml";
import { cleanMd } from "@src/utils/cleanMd";

import type { ReactElement } from "react";

const dir = "/i18n/content";

export const INVALID_FILENAME = "File must have .md or .html extension";

const loadContent = async (url: string, isMarkdown: boolean) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.statusText}: ${url}`);
  }
  const content = await response.text();
  return isMarkdown ? cleanMd(content) : cleanHtml(content);
};

/**
 * Loads a markdown or HTML file from i18n/content/[locale]/[filename]
 *
 * [locale] is detected from current language via react-i18next
 *
 * @param filename - Filename.md or Filename.html
 * @returns The content as HTML
 */
export const useContent = (filename: string) => {
  const { i18n } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [content, setContent] = useState<
    string | ReactElement | ReactElement[]
  >("");

  useEffect(() => {
    const loadFile = async () => {
      const isMarkdown = filename.endsWith(".md");
      const isHtml = filename.endsWith(".html");

      if (!isMarkdown && !isHtml) {
        setError(new Error(`${INVALID_FILENAME}: ${filename}`));
        setLoading(false);
        return;
      }

      const url = `${dir}/${i18n.language}/${filename}`;
      try {
        setLoading(true);
        const html = await loadContent(url, isMarkdown);
        setContent(html);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    void loadFile();
  }, [i18n.language, filename]);

  return { content, loading, error };
};
