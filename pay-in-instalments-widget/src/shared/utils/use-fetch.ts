import { useCallback, useEffect, useState } from "react";

export function useFetch<FetchFunction extends () => Promise<unknown>>(
  fetchFn: FetchFunction
) {
  type Data = Awaited<ReturnType<FetchFunction>>;

  const [fetchState, setFetchState] = useState<{
    data: Data | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | undefined;
  }>({
    data: undefined,
    isLoading: false,
    isError: false,
    error: undefined,
  });

  const fetchData = useCallback(async () => {
    setFetchState((prev) => ({ ...prev, isLoading: true, isError: false }));

    try {
      const data = await fetchFn();
      setFetchState({
        data: data as Data,
        isLoading: false,
        isError: false,
        error: undefined,
      });
    } catch (error) {
      setFetchState({
        data: undefined,
        isLoading: false,
        isError: true,
        error: error as Error,
      });
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    refetch: fetchData,
    ...fetchState,
  };
}
