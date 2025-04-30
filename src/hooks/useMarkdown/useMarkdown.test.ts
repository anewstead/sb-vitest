import { waitFor } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { renderHook } from "vitest-browser-react";

import { i18nextMock } from "@src/test/mocks/module/reactI18next";
import { worker } from "@src/test/msw/browser";

import {
  FAILED_TO_LOAD,
  FILE_NOT_FOUND,
  INVALID_FILENAME,
  useMarkdown,
} from "./useMarkdown";

// mock for default language
vi.mock("react-i18next", () => {
  return i18nextMock("en-GB");
});

const getHook = (filename: string) => {
  return renderHook(() => {
    return useMarkdown(filename);
  });
};

const MD_BASE_URL = "/i18n/content";
const MSW_MD_URL = `${MD_BASE_URL}/:locale/:filename`;

const mswSuccessEN = http.get(MSW_MD_URL, () => {
  return HttpResponse.text("# MD English");
});

const mswNetworkError = http.get(MSW_MD_URL, () => {
  return new HttpResponse(null, { status: 500 });
});

const mswFileNotFound = http.get(MSW_MD_URL, () => {
  return new HttpResponse(null, { status: 404 });
});

describe("useMarkdown", () => {
  beforeEach(() => {
    worker.use(mswSuccessEN);
  });

  it("should fail when filename is missing .md extension", async () => {
    const { result } = getHook("home");

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    expect(result.current.mdLoadError).toBeInstanceOf(Error);
    expect(result.current.mdLoadError?.message).toBe(
      `${INVALID_FILENAME}: home`
    );
  });

  it("should start in loading state", () => {
    const { result } = getHook("home.md");
    expect(result.current.mdLoading).toBe(true);
    expect(result.current.mdContent).toBe("");
    expect(result.current.mdLoadError).toBe(null);
  });

  it("should load markdown content successfully", async () => {
    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    expect(result.current.mdContent).toMatchObject([
      {
        type: "h1",
        props: {
          children: "MD English",
        },
      },
      "\n",
    ]);
    expect(result.current.mdLoadError).toBe(null);
  });

  it("should handle fetch errors", async () => {
    worker.use(mswNetworkError);

    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    expect(result.current.mdLoadError).toBeInstanceOf(Error);
    expect(result.current.mdLoadError?.message).toBe(
      `${FAILED_TO_LOAD}: ${MD_BASE_URL}/en-GB/home.md`
    );
  });

  it("should handle not found errors", async () => {
    worker.use(mswFileNotFound);

    const { result } = getHook("home.md");

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    expect(result.current.mdLoadError).toBeInstanceOf(Error);
    expect(result.current.mdLoadError?.message).toBe(
      `${FILE_NOT_FOUND}: ${MD_BASE_URL}/en-GB/home.md`
    );
  });

  it("should reload content when language changes", async () => {
    const { result, rerender } = getHook("home.md");

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    // change mock language in this test scope
    vi.doMock("react-i18next", () => {
      return i18nextMock("es-ES");
    });

    rerender();

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });
  });
});
