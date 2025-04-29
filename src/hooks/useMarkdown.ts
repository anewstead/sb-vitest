import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { cleanMd } from "@src/utils/cleanMd";

import type { ReactElement } from "react";

const dir = "/i18n/content";

const loadMarkdown = async (url: string) => {
  const response = await fetch(url);
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

  const [mdLoading, setMdLoading] = useState(true);
  const [mdLoadError, setMdLoadError] = useState<Error | null>(null);

  const [mdContent, setMdContent] = useState<
    string | ReactElement | ReactElement[]
  >("");

  useEffect(() => {
    const loadContent = async () => {
      const url = `${dir}/${i18n.language}/${filename}`;
      try {
        setMdLoading(true);
        const html = await loadMarkdown(url);
        setMdContent(html);
        setMdLoadError(null);
      } catch (err) {
        setMdLoadError(
          err instanceof Error ? err : new Error(`Failed to load: ${url}`)
        );
      } finally {
        setMdLoading(false);
      }
    };

    void loadContent();
  }, [i18n.language, filename]);

  return { mdContent, mdLoading, mdLoadError };
};
