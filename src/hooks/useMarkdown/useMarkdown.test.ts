import { waitFor } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { renderHook } from "vitest-browser-react";

import { i18n } from "@src/i18n/i18n";
import { worker } from "@src/test/msw/worker";

import { INVALID_FILENAME, useContent } from "./useMarkdown";

const getHook = (filename: string) => {
  return renderHook(() => {
    return useContent(filename);
  });
};

const MD_BASE_URL = "/i18n/content";
const MSW_CONTENT_URL = `${MD_BASE_URL}/:locale/:filename`;

const mswSuccess = http.get(MSW_CONTENT_URL, ({ params }) => {
  const locale = params.locale as string;
  if (locale) {
    const filename = params.filename as string;
    if (filename.endsWith(".md")) {
      return HttpResponse.text(`# MD ${locale}`);
    } else if (filename.endsWith(".html")) {
      return HttpResponse.text(`<h1>HTML ${locale}</h1>`);
    }
  }
  return HttpResponse.text("# Content no locale");
});

const mswNetworkError = http.get(MSW_CONTENT_URL, () => {
  return new HttpResponse(null, { status: 500 });
});

const mswFileNotFound = http.get(MSW_CONTENT_URL, () => {
  return new HttpResponse(null, { status: 404 });
});

describe("useContent", () => {
  beforeEach(async () => {
    worker.use(mswSuccess);
    await i18n.changeLanguage("en-GB");
  });

  it("should fail when filename is missing .md or .html extension", async () => {
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

    const content = result.current.content;
    expect(content).toMatchObject([
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

  it("should load HTML content successfully", async () => {
    const { result } = getHook("home.html");

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const content = result.current.content;
    expect(content).toMatchObject({
      type: "h1",
      props: {
        children: "HTML en-GB",
      },
    });
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
