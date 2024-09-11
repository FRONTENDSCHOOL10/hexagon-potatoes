import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InstaPosting from '@/pages/Posting/InstaPosting';
import useFetch from '@/hooks/useFetch';

const BoastDetail = (): JSX.Element => {
  const { boastId } = useParams();
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/posting/records/${boastId}`;

  const { error, status, data } = useFetch(ENDPOINT, 'author_id');
  console.log(data);
  if (status === 'loading') {
    // 로딩 스피너 만들면 넣어주기
    return <div>Loading...</div>;
  }

  return <>{data ? <InstaPosting item={data} /> : null}</>;
};

export default BoastDetail;
