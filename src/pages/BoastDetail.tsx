import { useParams } from 'react-router-dom';
import InstaPosting from '@/pages/Posting/InstaPosting';
import useFetch from '@/hooks/useFetch';
import { Helmet } from 'react-helmet-async';

const BoastDetail = () => {
  const { boastId } = useParams();
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/posting/records/${boastId}`;

  const { error, status, data } = useFetch(ENDPOINT, 'author_id');
  console.log(data);
  if (status === 'loading') {
    // 로딩 스피너 만들면 넣어주기
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{data?.title || '자랑 상세'} | Shipmate</title>
        <meta
          name="description"
          content={
            data?.content
              ? data.content.substring(0, 150)
              : '자세한 정보를 확인해보세요.'
          }
        />
        <meta name="keywords" content="자랑, 쉽메이트, 게시물" />
      </Helmet>
      {data ? <InstaPosting item={data} /> : null}
    </>
  );
};

export default BoastDetail;
