interface PostingCard {
  profileImg?: string | null;
  user: string;
  postingImg?: string;
  content: string;
  label?: string[];
}
interface DefaultProfileSVGProp {
  user: string;
}

// 기본 프로필 이미지
const DefaultProfileSVG = ({ user }: DefaultProfileSVGProp): JSX.Element => {
  return (
    <svg role="img" viewBox="0 0 24 24" aria-label={`${user}님의 프로필`}>
      <use href="/assets/sprite-sheet.svg#defaultprofile" />
    </svg>
  );
};

const PostingCard = ({
  profileImg,
  user,
  postingImg,
  content,
  label,
}: PostingCard) => {
  return (
    <article className="h-auto w-[21rem] justify-between rounded-[0.9375rem] bg-[#FFF] shadow-shadow-blue">
      <header className="flex h-12 flex-row items-center justify-between p-3">
        <span
          aria-label="닉네임"
          className="flex h-[1.5rem] items-center overflow-ellipsis text-center font-[Pretendard] text-xs font-normal not-italic text-black"
        >
          {/* 프로필 사진 있는지 없는지에 따라 기본프로필 띄울지 조건 처리 */}
          {profileImg ? (
            <img
              className="mr-2 h-6 w-6"
              src={profileImg}
              alt={`${user}님의 프로필`}
            />
          ) : (
            <span className="mr-1.5 h-6 w-6">
              <DefaultProfileSVG user={user} />
            </span>
          )}{' '}
          {user}
        </span>

        {/* 더보기 버튼 */}
        <button type="button" className="flex w-4 justify-end">
          <svg
            role="img"
            className="h-[1rem] w-[0.16669rem] text-gray-200"
            aria-label="더보기"
          >
            <use href="/assets/sprite-sheet.svg#3dot" />
          </svg>
        </button>
      </header>

      <figure className="h-[20.99rem]">
        <img src="" alt="포스팅 이미지" />
      </figure>

      <footer className="flex h-auto flex-col justify-between gap-3 p-3">
        <p className="text-body-1 text-black">{content}</p>

        {/* 아래는 나중에 레이블 만들어지면 컴포넌트 갖다가 쓰기..? */}
        <ul className="flex h-[1.38rem] items-center font-[Pretendard] text-[0.75rem] font-normal not-italic text-[#626871]">
          {/* {label.map((tag, index) => (
            <li
              key="index"
              className="flex h-[1.375rem] items-center justify-center gap-0.5 rounded bg-[#EDF1F6] px-1 py-0.5"
            >
              {tag}
            </li>
          ))} */}
        </ul>
      </footer>
    </article>
  );
};

export default PostingCard;
