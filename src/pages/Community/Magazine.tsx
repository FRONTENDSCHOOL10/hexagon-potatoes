import useFetch from '@/hooks/useFetch';
import BlogPosting from '../Posting/BlogPosting';

const Magazine = () => {
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/magazine/records`;

  const { error, status, data } = useFetch(ENDPOINT, 'author_id');
  const tipData = data?.items;
  console.log(tipData);

  if (status === 'loading') {
    // 로딩 스피너 만들면 넣어주기
    return <div>Loading...</div>;
  }
  if (!tipData || tipData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      {tipData?.map((d: any) => (
        <BlogPosting key={d.id} item={d} type={'magazine'} />
      ))}
    </>
  );
};

export default Magazine;
