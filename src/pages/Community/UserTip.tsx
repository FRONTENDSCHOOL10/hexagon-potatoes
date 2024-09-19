import useFetch from '@/hooks/useFetch';
import BlogPosting from '../Posting/BlogPosting';
import { Helmet } from 'react-helmet-async';

const UserTip = () => {
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/tip/records`;

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
      <Helmet>
        <title>유저 팁 | Shipmate</title>
        <meta
          name="description"
          content="사용자들이 공유한 유용한 팁을 확인하세요."
        />
        <meta name="keywords" content="유저 팁, 공유, 쉽메이트" />
      </Helmet>
      {tipData?.map((d: any) => <BlogPosting key={d.id} item={d} />)}
    </>
  );
};

export default UserTip;
