import SquarePostingCard from '@/components/PostingCard/SquarePostingCard';
import { useEffect } from 'react';

const RecommendFeed = () => {
  useEffect(() => {
    // 데이터 가져오는 부분 정리하기
  });

  return (
    <ul className="flex flex-row flex-wrap gap-x-2 gap-y-3 px-[0.69rem] pb-[1.94rem] pt-[0.75rem]">
      {data.map((item) => (
        <SquarePostingCard id={item.id} key={item.id} img={item.img} />
      ))}
    </ul>
  );
};

export default RecommendFeed;
