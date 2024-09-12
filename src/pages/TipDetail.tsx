import useFetch from '@/hooks/useFetch';
import { useParams } from 'react-router-dom';
import BlogPosting from './Posting/BlogPosting';

const TipDetail = () => {
  const { tipId } = useParams();
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/tip/records/${tipId}`;

  const { error, status, data } = useFetch(ENDPOINT, 'author_id');
  console.log(data);
  if (status === 'loading') {
    // 로딩 스피너 만들면 넣어주기
    return <div>Loading...</div>;
  }
  return <>{data ? <BlogPosting item={data} /> : null}</>;
};

export default TipDetail;
