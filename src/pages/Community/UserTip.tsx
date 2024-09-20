import useFetch from '@/hooks/useFetch';
import BlogPosting from '../Posting/BlogPosting';
import { Helmet } from 'react-helmet-async';

const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/tip/records`;

const UserTip = () => {
  const { status, data } = useFetch(ENDPOINT, 'author_id');

  if (status === 'loading') {
    // 로딩 스피너 만들면 넣어주기
    return <div>Loading...</div>;
  }

  if (status !== 'success') return null;

  const tipData = data.items;
  if (!tipData || tipData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <Helmet>
        <title>유저 팁 | Shipmate</title>
        <meta
          name="description"
          content="사용자들이 공유한 유용한 팁을 확인하세요."
        />
        <meta name="keywords" content="유저 팁, 공유, 쉽메이트" />
      </Helmet>
      <h1 className="sr-only">유저팁</h1>
      {tipData?.map((d: any) => (
        <BlogPosting key={d.id} item={d} type={'tip'} />
      ))}
    </>
  );
};

export default UserTip;
