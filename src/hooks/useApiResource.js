import { useEffect, useState } from "react";

export default function useApiResource(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher();
        if (!isMounted) return;
        setData(result.data);
        setSource(result.source);
        setError(result.error);
      } catch (unexpectedError) {
        if (!isMounted) return;
        setError(unexpectedError.message || "Something went wrong");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  return { data, loading, error, source };
}
