import { waitFor } from "@storybook/test";
import { describe, expect, it, vi } from "vitest";
import { renderHook } from "vitest-browser-react";

import { i18nextMock } from "@src/test/mocks/module/reactI18next";
import { worker } from "@src/test/msw/browser";
import {
  markdownNetworkError,
  markdownNotFound,
} from "@src/test/msw/handlers/markdownHandlers";

import { useMarkdown } from "./useMarkdown";

describe("useMarkdown", () => {
  it("should fail when filename is missing .md extension", async () => {
    const { result } = renderHook(() => {
      return useMarkdown("home");
    });

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    expect(result.current.mdLoadError).toBeInstanceOf(Error);
    expect(result.current.mdLoadError?.message).toBe(
      'Filename "home" must end with .md extension'
    );
  });

  it("should start in loading state", () => {
    const { result } = renderHook(() => {
      return useMarkdown("home.md");
    });
    expect(result.current.mdLoading).toBe(true);
    expect(result.current.mdContent).toBe("");
    expect(result.current.mdLoadError).toBe(null);
  });

  it("should load markdown content successfully", async () => {
    const { result } = renderHook(() => {
      return useMarkdown("home.md");
    });

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    expect(result.current.mdContent).toBeDefined();
    expect(result.current.mdLoadError).toBe(null);
  });

  it("should handle fetch errors", async () => {
    worker.use(markdownNetworkError);
    const { result } = renderHook(() => {
      return useMarkdown("home.md");
    });

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    expect(result.current.mdLoadError).toBeInstanceOf(Error);
    expect(result.current.mdLoadError?.message).toBe("Failed to fetch");
  });

  it("should handle not found errors", async () => {
    worker.use(markdownNotFound);
    const { result } = renderHook(() => {
      return useMarkdown("home.md");
    });

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    expect(result.current.mdLoadError).toBeInstanceOf(Error);
    expect(result.current.mdLoadError?.message).toBe("Markdown file not found");
  });

  it("should reload content when language changes", async () => {
    const { result, rerender } = renderHook(() => {
      return useMarkdown("home.md");
    });

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });

    // Change language by updating the mock
    vi.mock("react-i18next", () => {
      return i18nextMock("es-ES");
    });
    rerender();

    await waitFor(() => {
      expect(result.current.mdLoading).toBe(false);
    });
  });
});
