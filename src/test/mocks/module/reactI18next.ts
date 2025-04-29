import { vi } from "vitest";

export const i18nextMock = (language: string) => {
  return {
    useTranslation: () => {
      return {
        t: vi.fn(),
        i18n: { language },
      };
    },
  };
};

vi.mock("react-i18next", () => {
  return i18nextMock("en-GB");
});
