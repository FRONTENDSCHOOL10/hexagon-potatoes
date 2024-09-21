import MiniPostingCard from '@/components/PostingCard/MiniPostingCard';
import { Helmet } from 'react-helmet-async';

const Following = () => {
  const defaultTipImage = '/assets/shipmatelogo.webp';
  return (
    <>
      <Helmet>
        <title>팔로잉 | Shipmate</title>
        <meta
          name="description"
          content="팔로우한 사용자들의 게시물을 확인하세요."
        />
        <meta name="keywords" content="팔로잉, 게시물, 쉽메이트" />
      </Helmet>
      <div className="flex flex-col items-center justify-center">
        <img src={defaultTipImage} alt="" />
        <span>준비중인 페이지 입니다</span>
      </div>
    </>
  );
};

export default Following;
