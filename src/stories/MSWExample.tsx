import React, { useEffect, useState } from "react";

import axios from "axios";

import { SAMPLE_API } from "../testing/msw/endpoints";

export const MSWExample = () => {
  const [data, setData] = useState<{ data?: { mkey: string } } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(SAMPLE_API);
        setData(response.data);
      } catch (err) {
        const error = err as Error;
        setError(error.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h2>MSW Example</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
