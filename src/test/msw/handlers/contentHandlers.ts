import { http, HttpResponse } from "msw";

import { I18N } from "@src/i18n/i18n.const";

export const contentSuccess = http.get(I18N.CONTENT.MSW, ({ params }) => {
  const lng = params.lng as string;
  const filename = params.ns as string;

  if (filename.endsWith(".md")) {
    return HttpResponse.text(`# MD Content ${lng}`);
  } else if (filename.endsWith(".html")) {
    return HttpResponse.text(`<h1>HTML Content ${lng}</h1>`);
  }

  return HttpResponse.text("Unsupported file type requested");
});

export const contentError = http.get(I18N.CONTENT.MSW, () => {
  console.error("[MSW] Simulating content load error (500)");
  return new HttpResponse(null, { status: 500 });
});

export const contentSlow = http.get(I18N.CONTENT.MSW, async ({ params }) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });

  const lng = params.lng as string;
  const filename = params.ns as string;

  if (filename.endsWith(".md")) {
    return HttpResponse.text(`# Slow Content ${lng}`);
  } else if (filename.endsWith(".html")) {
    return HttpResponse.text(`<h1>Slow HTML Content ${lng}</h1>`);
  }
  return HttpResponse.text("Unsupported file type requested");
});
