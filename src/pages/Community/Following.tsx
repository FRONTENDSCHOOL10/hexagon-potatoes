import MiniPostingCard from '@/components/PostingCard/MiniPostingCard';

function Following() {
  return (
    <>
      <section className="mb-3 flex flex-col items-center justify-center gap-2 self-stretch px-3 py-[0rem]">
        <h1 className="text-heading-1 self-stretch pt-3 text-[black]">
          유저들의 팁
        </h1>
        <div className="flex h-[8.3125rem] w-[21rem] items-start justify-center gap-3 border-b border-solid border-gray-200 px-[0rem] py-2"></div>
        <div className="flex h-[8.3125rem] w-[21rem] items-start justify-center gap-3 border-b border-solid border-gray-200 px-[0rem] py-2"></div>
        <div className="flex h-[8.3125rem] w-[21rem] items-start justify-center gap-3 border-b border-solid border-gray-200 px-[0rem] py-2"></div>
      </section>
      <section className="flex w-[22.5rem] flex-col items-center justify-center gap-2 p-3">
        <h1 className="text-heading-1 self-stretch pt-3 text-[black]">
          유저들의 자랑
        </h1>
        <div className="flex h-[14.8125rem] w-[22.5rem] items-center justify-center gap-3">
          <MiniPostingCard
            nickname={'농담곰'}
            content={
              '농담곰을 샀는데 너무너무 귀엽구요 저도 갖고싶네요 말랑말랑할것 같음'
            }
          />
          <MiniPostingCard
            nickname={'농담곰'}
            content={
              '농담곰을 샀는데 너무너무 귀엽구요 저도 갖고싶네요 말랑말랑할것 같음'
            }
          />
        </div>
      </section>
    </>
  );
}

export default Following;
