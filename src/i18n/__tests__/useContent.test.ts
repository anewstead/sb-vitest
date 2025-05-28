import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getI18n } from "@src/i18n/i18n";
import { I18N } from "@src/i18n/i18n.const";
import { INVALID_FILENAME, useContent } from "@src/i18n/useContent";
import {
  contentError,
  contentSlow,
  contentSuccess,
} from "@src/test/msw/handlers/i18nContentHandlers";
import { server } from "@src/test/msw/server";

const getHook = (filename: string) => {
  return renderHook(() => {
    return useContent(filename);
  });
};
const i18n = getI18n();

describe("useContent", () => {
  beforeEach(async () => {
    server.use(contentSuccess);
    await i18n.changeLanguage(I18N.DEFAULT_LOCALE);
  });

  it("should fail when filename is missing .md or .html extension", async () => {
    const { result } = getHook("home");

    await waitFor(() => {
      const msg = result.current;
      expect(msg).toBe(`Error: ${INVALID_FILENAME}: home`);
    });
  });

  it("should start in loading state and load MD content successfully", async () => {
    server.use(contentSlow);
    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current).toBe("..");
    });

    await waitFor(() => {
      const content = result.current;
      expect(content).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "h2",
            props: {
              children: `${I18N.DEFAULT_LOCALE} Slow MD Content`,
            },
          }),
          expect.objectContaining({
            type: "h1",
            props: { children: "MD Lorem ipsum" },
          }),
        ])
      );
    });
  });

  it("should load HTML content successfully", async () => {
    const { result } = getHook("home.html");

    await waitFor(() => {
      const content = result.current;
      expect(content).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "h2",
            props: { children: I18N.DEFAULT_LOCALE },
          }),
          expect.objectContaining({
            type: "h3",
            props: { children: "HTML Lorem ipsum" },
          }),
        ])
      );
    });
  });

  it("should handle fetch server error", async () => {
    server.use(contentError);

    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current).toMatch(/^Error: Internal Server Error:/);
    });
  });

  it("should handle not found errors", async () => {
    server.use(contentError);

    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current).toMatch(/^Error: Internal Server Error:/);
    });
  });

  it("should reload content when language changes", async () => {
    const { result, rerender } = getHook("home.md");

    await waitFor(() => {
      const content = result.current;
      expect(content).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "h2",
            props: { children: I18N.DEFAULT_LOCALE },
          }),
          expect.objectContaining({
            type: "h1",
            props: { children: "MD Lorem ipsum" },
          }),
        ])
      );
    });

    // Change language and trigger re-render
    await waitFor(async () => {
      await i18n.changeLanguage(I18N.LOCALE.ES_ES);
    });

    rerender();

    await waitFor(() => {
      const content = result.current;
      expect(content).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "h2",
            props: { children: I18N.LOCALE.ES_ES },
          }),
          expect.objectContaining({
            type: "h1",
            props: { children: "MD Lorem ipsum" },
          }),
        ])
      );
    });
  });
});
