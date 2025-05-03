import axios from "axios";
import { describe, expect, it } from "vitest";

import { SAMPLE_API } from "@src/services/endpoints";
import { sampleData } from "@src/test/mocks/sampleData";
import {
  sampleError400,
  sampleNetworkError,
} from "@src/test/msw/handlers/sampleHandlers";
import { server } from "@src/test/msw/server";

describe("MSW Example Test", () => {
  it("should handle successful API response using default handler", async () => {
    // Default handler is already set up in all.ts
    const response = await axios.post(SAMPLE_API);

    // Assert the response matches the sample data
    expect(response.data).toEqual(sampleData);
  });

  it("should handle API error response using error handler", async () => {
    // Use the error handler
    server.use(sampleError400);

    // Make the API call and expect it to throw
    await expect(axios.post(SAMPLE_API)).rejects.toMatchObject({
      response: {
        status: 400,
        data: null,
      },
    });
  });

  it("should handle bad request using bad request handler", async () => {
    // Use the bad request handler
    server.use(sampleNetworkError);

    // Make the API call and expect it to throw with a network error
    await expect(axios.post(SAMPLE_API)).rejects.toThrow();
  });
});
