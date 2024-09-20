import useFetch from '@/hooks/useFetch';
import { useParams } from 'react-router-dom';
import BlogPosting from './Posting/BlogPosting';
import { Helmet } from 'react-helmet-async';

const TipDetail = () => {
  const { tipId } = useParams();
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/tip/records/${tipId}`;

  const { error, status, data } = useFetch(ENDPOINT, 'author_id');
  console.log(data);
  if (status === 'loading') {
    // 로딩 스피너 만들면 넣어주기
    return <div>Loading...</div>;
  }
  return (
    <>
      <Helmet>
        <title>{data?.title || '팁 상세'} | Shipmate</title>
        <meta
          name="description"
          content={
            data?.content
              ? data.content.substring(0, 150)
              : '자세한 정보를 확인해보세요.'
          }
        />
        <meta name="keywords" content="유저팁, 쉽메이트, 게시물" />
      </Helmet>
      {data ? <BlogPosting item={data} type={'tip'} /> : null}
    </>
  );

};

export default TipDetail;
