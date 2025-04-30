// import { vi } from "vitest";

// /**
//  * Usage:
//  *
//  * ```ts
//  * // Default top level in test file:
//  * vi.mock("react-i18next", () => {
//  *   return i18nextMock("en-GB");
//  * });
//  *
//  * // can change in test scope:
//  * it("should change language", () => {
//  *   // ...en-GB test
//  *   vi.doMock("react-i18next", () => {
//  *     return i18nextMock("es-ES");
//  *   });
//  *   // ...es-ES test
//  * });
//  * ```
//  */
// export const i18nextMock = (language: string) => {
//   return {
//     useTranslation: () => {
//       return {
//         t: vi.fn(),
//         i18n: { language },
//       };
//     },
//   };
// };
