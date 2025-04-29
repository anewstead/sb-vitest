import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { cleanMd } from "@src/utils/cleanMd";

import type { ReactElement } from "react";

const loadMarkdown = async (locale: string, section: string) => {
  const response = await fetch(`/content/${locale}/${section}.md`);
  const markdown = await response.text();
  return cleanMd(markdown);
};

export const useMarkdown = (section: string) => {
  const { i18n } = useTranslation();
  const [mdContent, setMdContent] = useState<
    string | ReactElement | ReactElement[]
  >("");
  const [mdLoading, setMdLoading] = useState(true);
  const [mdLoadError, setMdLoadError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setMdLoading(true);
        const html = await loadMarkdown(i18n.language, section);
        setMdContent(html);
        setMdLoadError(null);
      } catch (err) {
        setMdLoadError(
          err instanceof Error ? err : new Error("Failed to load content")
        );
      } finally {
        setMdLoading(false);
      }
    };

    void loadContent();
  }, [i18n.language, section]);

  return { mdContent, mdLoading, mdLoadError };
};
