import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InstaPosting from '@/pages/Posting/InstaPosting';

const BoastDetail = (): JSX.Element => {
  const { boastId } = useParams();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/posting/records/${boastId}`;

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosting = async () => {
      try {
        const response = await axios.get(ENDPOINT, {
          signal: abortController.signal,
          params: {
            expand: 'author_id',
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.name !== 'CanceledError') {
            return;
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosting();

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) {
    // 로딩 스피너 만들면 넣어주기
    return <div>Loading...</div>;
  }

  return <>{data ? <InstaPosting item={data} /> : null}</>;
};

export default BoastDetail;
