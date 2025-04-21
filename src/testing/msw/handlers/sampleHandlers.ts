import { http, HttpResponse } from "msw";

import { SAMPLE_API } from "@src/testing/msw/endpoints";

import { sampleData, sampleError } from "./sampleData";

export const sampleDefault = http.post(SAMPLE_API, () => {
  return HttpResponse.json(sampleData);
});

export const sampleBadRequest = http.post(SAMPLE_API, () => {
  return HttpResponse.error();
});

export const sampleErrorResponse = http.post(SAMPLE_API, () => {
  return HttpResponse.json(sampleError, {
    status: 400,
  });
});
