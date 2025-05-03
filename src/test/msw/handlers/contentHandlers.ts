import { http, HttpResponse } from "msw";

const CONTENT_PATH = "/i18n/:locale/content/:filename";

export const contentSuccess = http.get(CONTENT_PATH, ({ params }) => {
  const locale = params.locale as string;
  const filename = params.filename as string;

  if (filename.endsWith(".md")) {
    return HttpResponse.text(`# MD Content ${locale}`);
  } else if (filename.endsWith(".html")) {
    return HttpResponse.text(`<h1>HTML Content ${locale}</h1>`);
  }

  return HttpResponse.text("Unsupported file type requested");
});

export const contentError = http.get(CONTENT_PATH, () => {
  console.error("[MSW] Simulating content load error (500)");
  return new HttpResponse(null, { status: 500 });
});

export const contentSlow = http.get(CONTENT_PATH, async ({ params }) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, 999);
  });

  const locale = params.locale as string;
  const filename = params.filename as string;

  if (filename.endsWith(".md")) {
    return HttpResponse.text(`# Slow Content ${locale}`);
  } else if (filename.endsWith(".html")) {
    return HttpResponse.text(`<h1>Slow HTML Content ${locale}</h1>`);
  }
  return HttpResponse.text("Unsupported file type requested");
});
