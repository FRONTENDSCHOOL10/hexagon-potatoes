interface PostingCard {
  profileImg?: string | null;
  user?: string;
  postingImg?: string;
  content?: string;
}

const DefaultProfileSVG = (): JSX.Element => {
  return (
    <svg role="img" viewBox="0 0 24 24" aria-label="기본 프로필 사진">
      <use href="/assets/sprite-sheet.svg#defaultprofile" />
    </svg>
  );
};

const PostingCard = ({
  profileImg,
  user,
  postingImg,
  content,
}: PostingCard) => {
  return (
    <article className="h-[28.8125rem] w-[21rem] border border-solid border-[black]">
      <header className="flex flex-row items-center justify-between p-3">
        <span
          aria-label="닉네임"
          className="flex h-[1.5rem] items-center overflow-ellipsis text-center font-[Pretendard] text-xs font-normal not-italic text-[#020715]"
        >
          {profileImg ? (
            <img className="mr-2 h-6 w-6" src={profileImg} alt="프로필이미지" />
          ) : (
            <span className="mr-1.5 h-6 w-6">
              <DefaultProfileSVG />
            </span>
          )}{' '}
          {user}
        </span>
        <svg
          role="img"
          className="h-[1rem] w-[0.16669rem]"
          aria-label="기본 프로필 사진"
        >
          <use href="/assets/sprite-sheet.svg#3dot" />
        </svg>
      </header>
      {/* <img src="" alt="" /> */}
      <div className="bg-[#CAD4E7]"></div>
      <p>{content}</p>
      <div></div>
    </article>
  );
};

export default PostingCard;
