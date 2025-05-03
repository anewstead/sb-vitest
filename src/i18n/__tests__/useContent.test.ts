import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { i18n } from "@src/i18n/i18n";
import { I18N } from "@src/i18n/i18n.const";
import {
  contentError,
  contentSlow,
  contentSuccess,
} from "@src/test/msw/handlers/contentHandlers";
import { server } from "@src/test/msw/server";

import { INVALID_FILENAME, useContent } from "../useContent";

const getHook = (filename: string) => {
  return renderHook(() => {
    return useContent(filename);
  });
};

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

  it("should start in loading state", async () => {
    server.use(contentSlow);
    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current).toBe("..");
    });
  });

  it("should load markdown content successfully", async () => {
    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current).toMatchObject([
        {
          type: "h1",
          props: {
            children: "MD Content en-GB",
          },
        },
        "\n",
      ]);
    });
  });

  it("should load HTML content successfully", async () => {
    const { result } = getHook("home.html");

    await waitFor(() => {
      expect(result.current).toMatchObject({
        type: "h1",
        props: {
          children: "HTML Content en-GB",
        },
      });
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
      expect(result.current).toMatchObject([
        {
          type: "h1",
          props: {
            children: "MD Content en-GB",
          },
        },
        "\n",
      ]);
    });

    // Change language and trigger re-render
    await waitFor(async () => {
      await i18n.changeLanguage(I18N.LOCALE.ES_ES);
    });

    rerender();

    await waitFor(() => {
      expect(result.current).toMatchObject([
        {
          type: "h1",
          props: {
            children: "MD Content es-ES",
          },
        },
        "\n",
      ]);
    });
  });
});
