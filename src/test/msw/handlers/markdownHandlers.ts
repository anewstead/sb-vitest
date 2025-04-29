import { http, HttpResponse } from "msw";

export const markdownDefault = http.get(
  "/i18n/content/:locale/:filename.md",
  () => {
    return HttpResponse.text("# Test Markdown Content");
  }
);

export const markdownNetworkError = http.get(
  "/i18n/content/:locale/:filename.md",
  () => {
    return HttpResponse.error();
  }
);

export const markdownNotFound = http.get(
  "/i18n/content/:locale/:filename.md",
  () => {
    return new Response(null, { status: 404 });
  }
);
