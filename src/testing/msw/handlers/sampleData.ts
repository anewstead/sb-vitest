import type { SampleResponse } from "@src/services/endpoints.type";

export const sampleData: SampleResponse = {
  data: {
    mkey: "mvalue",
  },
};

export const sampleError = {
  data: null,
  errors: [{ message: "mock error message" }],
};
