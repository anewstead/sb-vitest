import { http, HttpResponse } from "msw";

import { SAMPLE_API } from "@src/services/endpoints";

import { sampleData } from "./sampleData";

export const sampleDefault = http.post(SAMPLE_API, () => {
  return HttpResponse.json(sampleData);
});

export const sampleNetworkError = http.post(SAMPLE_API, () => {
  return HttpResponse.error();
});

export const sampleError400 = http.post(SAMPLE_API, () => {
  return HttpResponse.json(null, { status: 400 });
});

export const sampleNoData = http.post(SAMPLE_API, () => {
  return HttpResponse.json(null);
});
