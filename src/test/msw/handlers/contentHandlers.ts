import { http, HttpResponse } from "msw";

import { I18N } from "@src/i18n/i18n.const";
import { l, loremHTML, loremMD } from "@src/test/mocks/i18n/content/lorem";

export const contentSuccess = http.get(I18N.CONTENT.MSW, ({ params }) => {
  const lng = params.lng as string;
  const filename = params.ns as string;

  if (filename.endsWith(".md")) {
    return HttpResponse.text(`## ${lng} ${loremMD}`);
  } else if (filename.endsWith(".html")) {
    return HttpResponse.text(`<h2>${lng}</h2> ${loremHTML}`);
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
    return HttpResponse.text(`## ${lng} Slow MD Content ${loremMD}`);
  } else if (filename.endsWith(".html")) {
    return HttpResponse.text(`<h2>${lng} Slow HTML Content </h2> ${loremHTML}`);
  }
  return HttpResponse.text("Unsupported file type requested");
});
