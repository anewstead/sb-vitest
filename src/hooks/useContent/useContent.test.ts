import { waitFor } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { renderHook } from "vitest-browser-react";

import { i18n } from "@src/i18n/i18n";
import { worker } from "@src/test/msw/worker";

import { INVALID_FILENAME, useContent } from "./useContent";

const getHook = (filename: string) => {
  return renderHook(() => {
    return useContent(filename);
  });
};

const MSW_CONTENT_URL = `/i18n/:locale/content/:filename`;

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

const mswSlow = http.get(MSW_CONTENT_URL, async () => {
  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  return HttpResponse.text("Content");
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
      const msg = result.current;
      expect(msg).toBe(`Error: ${INVALID_FILENAME}: home`);
    });
  });

  it("should start in loading state", async () => {
    worker.use(mswSlow);
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
            children: "MD en-GB",
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
          children: "HTML en-GB",
        },
      });
    });
  });

  it("should handle fetch server error", async () => {
    worker.use(mswNetworkError);

    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current).toMatch(/^Error: Internal Server Error:/);
    });
  });

  it("should handle not found errors", async () => {
    worker.use(mswFileNotFound);

    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current).toMatch(/^Error: Not Found:/);
    });
  });

  it("should reload content when language changes", async () => {
    const { result, rerender } = getHook("home.md");

    await waitFor(() => {
      expect(result.current).toMatchObject([
        {
          type: "h1",
          props: {
            children: "MD en-GB",
          },
        },
        "\n",
      ]);
    });

    // Change language and trigger re-render
    await i18n.changeLanguage("es-ES");
    rerender();

    await waitFor(() => {
      expect(result.current).toMatchObject([
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
});
