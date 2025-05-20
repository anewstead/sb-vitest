import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getI18n } from "@src/i18n/i18n";
import { I18N } from "@src/i18n/i18n.const";
import { common } from "@src/test/mocks/i18n/common";
import { home } from "@src/test/mocks/i18n/home";
import { i18nError } from "@src/test/msw/handlers/i18nJsonHandlers";
import { server } from "@src/test/msw/server";

const i18n = getI18n();

describe("i18n setup with MSW", () => {
  beforeEach(async () => {
    // Reset to default language before each test
    await i18n.changeLanguage(I18N.DEFAULT_LOCALE);
  });

  it("should load translations successfully using MSW", () => {
    // Test common namespace
    const commonText = i18n.t("common:hello");
    expect(commonText).toBe(`[${I18N.DEFAULT_LOCALE}] ${common.hello}`);

    // Test home namespace
    const homeText = i18n.t("home:changeText");
    expect(homeText).toBe(`[${I18N.DEFAULT_LOCALE}] ${home.changeText}`);
  });

  it("should handle language switching with MSW", async () => {
    // Get text in English
    const enText = i18n.t("common:hello");
    expect(enText).toBe(`[${I18N.DEFAULT_LOCALE}] ${common.hello}`);

    // Switch to Spanish
    await i18n.changeLanguage(I18N.LOCALE.ES_ES);
    await waitFor(() => {
      const esText = i18n.t("common:hello");
      expect(esText).toBe(`[${I18N.LOCALE.ES_ES}] ${common.hello}`);
    });
  });

  it("should handle server errors by keeping existing translations", async () => {
    // First load Spanish translations successfully
    await i18n.changeLanguage(I18N.LOCALE.ES_ES);
    await waitFor(() => {
      const text = i18n.t("common:hello");
      expect(text).toBe(`[${I18N.LOCALE.ES_ES}] ${common.hello}`);
    });

    // Override with error handler
    server.use(i18nError);

    // Try to reload Spanish translations (this will fail)
    await i18n.changeLanguage(I18N.LOCALE.ES_ES);

    // Should keep existing Spanish translations
    await waitFor(() => {
      const text = i18n.t("common:hello");
      expect(text).toBe(`[${I18N.LOCALE.ES_ES}] ${common.hello}`);
    });
  });

  it("should use fallback language when requested language is not supported", async () => {
    // Try to switch to unsupported language
    await i18n.changeLanguage("xx_XX");

    await waitFor(() => {
      const text = i18n.t("common:hello");
      // Should use fallback language (en-GB)
      expect(text).toBe(`[${I18N.DEFAULT_LOCALE}] ${common.hello}`);
    });
  });
});
