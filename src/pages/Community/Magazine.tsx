import useFetch from '@/hooks/useFetch';
import BlogPosting from '../Posting/BlogPosting';
import { Helmet } from 'react-helmet-async';

const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/magazine/records`;

const Magazine = () => {
  const { status, data } = useFetch(ENDPOINT, 'author_id');

  if (status !== 'success') return null;
  const tipData = data?.items;

  if (!tipData || tipData.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <>
      <Helmet>
        <title>매거진 | Shipmate</title>
        <meta name="description" content="최신 매거진 게시물을 확인해보세요." />
        <meta name="keywords" content="매거진, 최신 게시물, 쉽메이트" />
      </Helmet>
      <h1 className="sr-only">매거진</h1>
      {tipData?.map((d: any) => (
        <BlogPosting key={d.id} item={d} type={'magazine'} />
      ))}
    </>
  );
};

export default Magazine;
