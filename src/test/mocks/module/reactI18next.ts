import { vi } from "vitest";

vi.mock("react-i18next", () => {
  return {
    useTranslation: () => {
      const t = vi.fn();
      const i18n = { language: "en-GB" };
      return { t, i18n };
    },
  };
});
