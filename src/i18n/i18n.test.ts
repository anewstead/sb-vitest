import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { i18nError } from "@src/test/msw/handlers/i18nHandlers";
import { server } from "@src/test/msw/server";

import { i18n } from "./i18n";

describe("i18n setup with MSW", () => {
  beforeEach(async () => {
    // Reset to default language before each test
    await i18n.changeLanguage("en-GB");
  });

  it("should load translations successfully using MSW", () => {
    // Test common namespace
    const commonText = i18n.t("common:hello");
    expect(commonText).toBe("[en-GB] Hello");

    // Test home namespace
    const homeText = i18n.t("home:changeText");
    expect(homeText).toBe("[en-GB] Change Text");
  });

  it("should handle language switching with MSW", async () => {
    // Get text in English
    const enText = i18n.t("common:hello");
    expect(enText).toBe("[en-GB] Hello");

    // Switch to Spanish
    await i18n.changeLanguage("es-ES");
    await waitFor(() => {
      const esText = i18n.t("common:hello");
      expect(esText).toBe("[es-ES] Hello");
    });
  });

  it("should handle server errors by keeping existing translations", async () => {
    // First load Spanish translations successfully
    await i18n.changeLanguage("es-ES");
    await waitFor(() => {
      const text = i18n.t("common:hello");
      expect(text).toBe("[es-ES] Hello");
    });

    // Override with error handler
    server.use(i18nError);

    // Try to reload Spanish translations (this will fail)
    await i18n.changeLanguage("es-ES");

    // Should keep existing Spanish translations
    await waitFor(() => {
      const text = i18n.t("common:hello");
      expect(text).toBe("[es-ES] Hello");
    });
  });

  it("should use fallback language when requested language is not supported", async () => {
    // Try to switch to unsupported language
    await i18n.changeLanguage("fr-FR");

    await waitFor(() => {
      const text = i18n.t("common:hello");
      // Should use fallback language (en-GB)
      expect(text).toBe("[en-GB] Hello");
    });
  });
});
