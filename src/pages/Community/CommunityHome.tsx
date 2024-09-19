import TipArticleList from '@/components/Lists/TipArticleList';
import MiniPostingCard from '@/components/PostingCard/MiniPostingCard';
import useFetch from '@/hooks/useFetch';
import getRandomItems from '@/utils/getRandomItems';

const CommunityHome = () => {
  const tipUrl = `${import.meta.env.VITE_PB_URL}/api/collections/tip/records`;
  const boastUrl = `${import.meta.env.VITE_PB_URL}/api/collections/posting/records`;

  const {
    status: tipStatus,
    error: tipError,
    data: tipData,
  } = useFetch(tipUrl, 'author_id');
  const {
    status: boastStatus,
    error: boastError,
    data: boastData,
  } = useFetch(boastUrl, 'author_id');

  const tipDatas = tipData?.items ?? [];
  const randomTips = getRandomItems(tipDatas, 3);

  const boastDatas = boastData?.items ?? [];
  const randomBoasts = getRandomItems(boastDatas, 2);

  return (
    <>
      <section className="mb-3 flex w-[22.5rem] flex-col items-center justify-center gap-2 self-stretch px-3 py-[0rem]">
        <h2 className="self-stretch pt-3 text-heading-1 text-[black]">
          유저들의 팁
        </h2>
        <TipArticleList data={randomTips} />
      </section>
      <section className="flex w-[22.5rem] flex-col items-center justify-center gap-2 p-3">
        <h2 className="self-stretch pt-3 text-heading-1 text-[black]">
          유저들의 자랑
        </h2>
        <div className="flex h-[14.8125rem] w-[22.5rem] items-center justify-center gap-3">
          {randomBoasts.map((d: any) => (
            <MiniPostingCard
              key={d?.id}
              id={d?.id}
              nickname={d?.expand?.author_id?.nickname}
              content={d?.content}
              photo={d.photo.length !== 0 ? d : null}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CommunityHome;
