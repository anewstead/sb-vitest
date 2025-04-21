import { http, HttpResponse } from "msw";

const MOCK_URL = "http://localhost:3000/api/main";

import { sampleData, sampleError } from "./sampleData";

export const sampleDefault = http.post(MOCK_URL, () => {
  return HttpResponse.json(sampleData);
});

export const sampleBadRequest = http.post(MOCK_URL, () => {
  return HttpResponse.error();
});

export const sampleErrorResponse = http.post(MOCK_URL, () => {
  return HttpResponse.json(sampleError, {
    status: 400,
  });
});
