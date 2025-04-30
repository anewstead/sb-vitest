import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { cleanMd } from "@src/utils/cleanMd";

import type { ReactElement } from "react";

const dir = "/i18n/content";

export const INVALID_FILENAME = "Incorrect file extension";

const loadMarkdown = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.statusText}: ${url}`);
  }
  const markdown = await response.text();
  return cleanMd(markdown);
};

/**
 * Loads a markdown file from i18n/content/[locale]/[filename.md]
 *
 * [locale] is detected from current language via react-i18next
 *
 * @param filename - Filename.md
 * @returns The markdown content
 */
export const useMarkdown = (filename: string) => {
  const { i18n } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [content, setContent] = useState<
    string | ReactElement | ReactElement[]
  >("");

  useEffect(() => {
    const loadContent = async () => {
      if (!filename.endsWith(".md")) {
        setError(new Error(`${INVALID_FILENAME}: ${filename}`));
        setLoading(false);
        return;
      }

      const url = `${dir}/${i18n.language}/${filename}`;
      try {
        setLoading(true);
        const html = await loadMarkdown(url);
        setContent(html);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    void loadContent();
  }, [i18n.language, filename]);

  return { content, loading, error };
};
