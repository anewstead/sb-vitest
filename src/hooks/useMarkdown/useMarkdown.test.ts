import { waitFor } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { renderHook } from "vitest-browser-react";

import { i18n } from "@src/i18n/i18n";
import { worker } from "@src/test/msw/worker";

import { INVALID_FILENAME, useMarkdown } from "./useMarkdown";

const getHook = (filename: string) => {
  return renderHook(() => {
    return useMarkdown(filename);
  });
};

const MD_BASE_URL = "/i18n/content";
const MSW_MD_URL = `${MD_BASE_URL}/:locale/:filename`;

const mswSuccess = http.get(MSW_MD_URL, ({ params }) => {
  if (params.locale) {
    return HttpResponse.text(`# MD ${params.locale as string}`);
  }
  return HttpResponse.text("# MD no locale");
});

const mswNetworkError = http.get(MSW_MD_URL, () => {
  return new HttpResponse(null, { status: 500 });
});

const mswFileNotFound = http.get(MSW_MD_URL, () => {
  return new HttpResponse(null, { status: 404 });
});

describe("useMarkdown", () => {
  beforeEach(() => {
    worker.use(mswSuccess);
  });

  it("should fail when filename is missing .md extension", async () => {
    const { result } = getHook("home");

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(`${INVALID_FILENAME}: home`);
  });

  it("should start in loading state", () => {
    const { result } = getHook("home.md");
    expect(result.current.loading).toBe(true);
    expect(result.current.content).toBe("");
    expect(result.current.error).toBe(null);
  });

  it("should load markdown content successfully", async () => {
    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.content).toMatchObject([
      {
        type: "h1",
        props: {
          children: "MD en-GB",
        },
      },
      "\n",
    ]);
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch server error", async () => {
    worker.use(mswNetworkError);

    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(
      `Internal Server Error: ${MD_BASE_URL}/en-GB/home.md`
    );
  });

  it("should handle not found errors", async () => {
    worker.use(mswFileNotFound);

    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(
      `Not Found: ${MD_BASE_URL}/en-GB/home.md`
    );
  });

  it("should reload content when language changes", async () => {
    const { result, rerender } = getHook("home.md");

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.content).toMatchObject([
      {
        type: "h1",
        props: {
          children: "MD en-GB",
        },
      },
      "\n",
    ]);

    // Change language and trigger re-render
    await i18n.changeLanguage("es-ES");
    rerender();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.content).toMatchObject([
      {
        type: "h1",
        props: {
          children: "MD es-ES",
        },
      },
      "\n",
    ]);
  });
});
