import { http, HttpResponse } from "msw";

const CONTENT_PATH = "/i18n/:lng/content/:ns";

export const contentSuccess = http.get(CONTENT_PATH, ({ params }) => {
  const lng = params.lng as string;
  const ns = params.ns as string;

  if (ns.endsWith(".md")) {
    return HttpResponse.text(`# MD Content ${lng}`);
  } else if (ns.endsWith(".html")) {
    return HttpResponse.text(`<h1>HTML Content ${lng}</h1>`);
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

  const lng = params.lng as string;
  const ns = params.ns as string;

  if (ns.endsWith(".md")) {
    return HttpResponse.text(`# Slow Content ${lng}`);
  } else if (ns.endsWith(".html")) {
    return HttpResponse.text(`<h1>Slow HTML Content ${lng}</h1>`);
  }
  return HttpResponse.text("Unsupported file type requested");
});
