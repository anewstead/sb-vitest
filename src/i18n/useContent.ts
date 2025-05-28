import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { cleanHtml } from "@src/i18n/cleanHtml";
import { cleanMd } from "@src/i18n/cleanMd";

import { I18N } from "./i18n.const";

import type { ReactElement } from "react";

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
 * Loads a markdown or HTML file (public folder)
 *
 * [locale] is detected from current language via react-i18next
 *
 * @param filename - .md or .html
 * @returns The content as HTML
 */
export const useContent = (filename: string) => {
  const { i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [error, setError] = useState(false);
  const [content, setContent] = useState<
    string | ReactElement | ReactElement[]
  >("");

  /**
   * Load content from file
   */
  useEffect(() => {
    const loadFile = async () => {
      const isMarkdown = filename.endsWith(".md");
      const isHtml = filename.endsWith(".html");

      if (!isMarkdown && !isHtml) {
        setError(true);
        setContent(`Error: ${INVALID_FILENAME}: ${filename}`);
        return;
      }

      setLoading(true);
      setError(false);
      const folder = I18N.CONTENT.PATH.replace("{{lng}}", i18n.language);
      const file = folder.replace("{{ns}}", filename);
      try {
        const html = await loadContent(file, isMarkdown);
        setContent(html);
      } catch (err) {
        setError(true);
        setContent(`Error: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    void loadFile();
  }, [i18n.language, filename]);

  /**
   * Update loading dots animation when loading
   */
  useEffect(() => {
    if (!loading) {
      return;
    }

    const interval = setInterval(() => {
      setLoadingDots((dots) => {
        /* v8 ignore next */
        if (dots.length >= 3) {
          return "\u00A0";
        }
        return `${dots}.`;
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  /**
   * Show loading dots when loading and not in error state
   */
  useEffect(() => {
    if (loading && !error) {
      setContent(loadingDots);
    }
  }, [loading, loadingDots, error]);

  return content;
};
