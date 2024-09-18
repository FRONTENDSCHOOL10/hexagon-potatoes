import MiniPostingCard from '@/components/PostingCard/MiniPostingCard';

const Following = () => {
  const defaultTipImage = '/assets/shipmatelogo.png';
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={defaultTipImage} alt="" />
      <span>준비중인 페이지 입니다</span>
    </div>
  );
};

export default Following;
