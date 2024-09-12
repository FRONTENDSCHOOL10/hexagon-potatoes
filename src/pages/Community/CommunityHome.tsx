import TipArticleList from '@/components/Lists/TipArticleList';
import MiniPostingCard from '@/components/PostingCard/MiniPostingCard';
import useFetch from '@/hooks/useFetch';
import getPbImageURL from '@/utils/getPbImageURL';

const CommunityHome = () => {
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io`;
  const tipUrl = `${ENDPOINT}/api/collections/tip/records`;
  const boastUrl = `${ENDPOINT}/api/collections/posting/records`;
  const defaultTipImage = '/assets/shipmatelogo.png'; // 기본 팁 이미지 URL

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
  // console.log(tipData?.items);

  const tipDatas = tipData?.items;
  const boastDatas = boastData?.items;
  // console.log(boastDatas);
  return (
    <>
      <section className="mb-3 flex w-[22.5rem] flex-col items-center justify-center gap-2 self-stretch px-3 py-[0rem]">
        <h2 className="self-stretch pt-3 text-heading-1 text-[black]">
          유저들의 팁
        </h2>
        <TipArticleList data={tipDatas} />
      </section>
      <section className="flex w-[22.5rem] flex-col items-center justify-center gap-2 p-3">
        <h2 className="self-stretch pt-3 text-heading-1 text-[black]">
          유저들의 자랑
        </h2>
        <div className="flex h-[14.8125rem] w-[22.5rem] items-center justify-center gap-3">
          {boastDatas
            ?.slice(0, 2)
            .map((d: any) => (
              <MiniPostingCard
                key={d?.id}
                id={d?.id}
                nickname={d?.expand?.author_id?.nickname}
                content={d?.content}
                photo={d.photo ? getPbImageURL(ENDPOINT, d) : defaultTipImage}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default CommunityHome;
