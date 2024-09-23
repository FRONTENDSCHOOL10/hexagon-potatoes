import useFetch from '@/hooks/useFetch';
import { useParams } from 'react-router-dom';
import BlogPosting from './BlogPosting';
import { Helmet } from 'react-helmet-async';

const TipDetail = () => {
  const { tipId } = useParams();
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/tip/records/${tipId}`;

  const { error, status, data } = useFetch(ENDPOINT, 'author_id');

  if (status !== 'success') return null;

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

        <meta
          property="og:title"
          content={`${data?.title || '자랑 상세'} | Shipmate`}
        />
        <meta
          property="og:description"
          content={
            data?.content
              ? data.content.substring(0, 150)
              : '자세한 정보를 확인해보세요.'
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://sheepmate.netlify.app/home/community/boast/${tipId}`}
        />
        <meta
          property="og:image"
          content={
            data?.photo ||
            'https://cdn.discordapp.com/attachments/1044545035221352531/1287620951554527324/landing_1.png?ex=66f235f5&is=66f0e475&hm=143d17f0a2bdb88e9772825fab5b924e2cc2fdea9167cbe4dcc1bc82344d4b76&'
          }
        />
      </Helmet>

      {data ? <BlogPosting item={data} type={'tip'} /> : null}
    </>
  );
};

export default TipDetail;
