import RatingStar from '@/components/RatingStar/RatingStar';

interface ReviewProp {
  user: string;
  content: string;
  date: string;
  profileImg?: string | null;
  starRate: number;
}

// profileImg가 없을 경우 기본 프로필 컴포넌트
const DefaultProfileSVG = (): JSX.Element => {
  return (
    <svg role="img" viewBox="0 0 24 24" aria-label="기본 프로필 사진">
      <use href="/assets/sprite-sheet.svg#defaultprofile" />
    </svg>
  );
};

//리뷰 DB에서 유저 닉네임, 프로필 이미지, 후기내용, 작성날짜, 평점 가져오면될듯
const Review = ({
  user,
  profileImg,
  content,
  date,
  starRate,
}: ReviewProp): JSX.Element => {
  return (
    <article
      aria-label="사용자후기"
      className="flex w-[13.75rem] flex-col gap-2 rounded-[0.375rem] bg-[#EDF1F6] p-3"
    >
      <header className="flex flex-row items-center justify-between">
        <span
          aria-label="닉네임"
          className="flex h-[1.5rem] items-center overflow-ellipsis text-center font-[Pretendard] text-xs font-normal not-italic text-[#020715]"
        >
          {profileImg ? (
            <img className="mr-1.5 h-6 w-6" src={profileImg} alt="프로필" />
          ) : (
            <span className="mr-1.5 h-6 w-6">
              <DefaultProfileSVG />
            </span>
          )}{' '}
          {user}
        </span>
        <RatingStar value={starRate} />
      </header>
      <div
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
        className="h-[3.75rem] max-h-[3.75rem] overflow-hidden text-ellipsis font-[Pretendard] text-[0.875rem] font-light not-italic text-[#020715]"
        aria-label="후기 작성내용"
      >
        {content}
      </div>
      <time
        className="overflow-hidden overflow-ellipsis font-[Pretendard] text-xs font-normal not-italic text-[#626871]"
        dateTime={date}
        aria-label="후기 작성시간"
      >
        {date}
      </time>
    </article>
  );
};

export default Review;
