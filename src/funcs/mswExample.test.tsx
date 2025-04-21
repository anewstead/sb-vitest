import axios from "axios";
import { describe, expect, it } from "vitest";

import { worker } from "../testing/msw/browser";
import { SAMPLE_API } from "../testing/msw/endpoints";
import { sampleData, sampleError } from "../testing/msw/handlers/sampleData";
import {
  sampleBadRequest,
  sampleErrorResponse,
} from "../testing/msw/handlers/sampleHandlers";

describe("MSW Example Test", () => {
  it("should handle successful API response using default handler", async () => {
    // Default handler is already set up in all.ts
    const response = await axios.post(SAMPLE_API);

    // Assert the response matches the sample data
    expect(response.data).toEqual(sampleData);
  });

  it("should handle API error response using error handler", async () => {
    // Use the error handler
    worker.use(sampleErrorResponse);

    // Make the API call and expect it to throw
    await expect(axios.post(SAMPLE_API)).rejects.toMatchObject({
      response: {
        status: 400,
        data: sampleError,
      },
    });
  });

  it("should handle bad request using bad request handler", async () => {
    // Use the bad request handler
    worker.use(sampleBadRequest);

    // Make the API call and expect it to throw with a network error
    await expect(axios.post(SAMPLE_API)).rejects.toThrow();
  });
});
