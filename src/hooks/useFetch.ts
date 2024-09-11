import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import axios from 'axios';

function useFetch(url: string, expandFields?: string) {
  const [state, setState] = useImmer<{
    status: string;
    error: Error | null;
    data: any;
  }>({
    status: 'pending',
    error: null,
    data: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    setState((draft) => {
      draft.status = 'loading';
    });

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          signal: abortController.signal,
          params: {
            expand: expandFields,
          },
        });

        setState((draft) => {
          draft.status = 'success';
          draft.data = response.data;
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.name !== 'CanceledError') {
            setState((draft) => {
              draft.status = 'error';
              draft.error = error;
            });
          }
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, setState, expandFields]);

  return state;
}

export default useFetch;
