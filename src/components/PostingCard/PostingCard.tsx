import DefaultProfileSVG from '../DefaultProfileSVG/DefaultProfileSVG';
import LabelList from '../Label/LabelList';

interface PropTypes {
  profileImg?: string;
  user: string;
  postingImg?: string;
  content: string;
  label?: string[];
}

const PostingCard = ({
  profileImg,
  user,
  postingImg,
  content,
  label,
}: PropTypes) => {
  const defaultTipImage = '/assets/shipmatelogo.png'; // 기본 팁 이미지 URL
  return (
    <article className="mx-auto h-auto w-[21rem] justify-between rounded-[0.9375rem] bg-[#FFF] shadow-shadow-blue">
      <header className="flex h-12 flex-row items-center justify-between p-3">
        <div className="flex h-[1.5rem] items-center gap-[0.5rem] overflow-ellipsis text-center font-[Pretendard] text-xs font-normal not-italic text-black">
          {/* 프로필 사진 있는지 없는지에 따라 기본프로필 띄울지 조건 처리 */}
          {profileImg ? (
            <img
              className="h-6 w-6 overflow-hidden rounded-full"
              src={profileImg}
              alt={`${user}님의 프로필`}
            />
          ) : (
            <DefaultProfileSVG size={24} />
          )}
          <span aria-label="닉네임">{user}</span>
        </div>

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

      <figure className="h-[20.99rem] bg-slate-200">
        <img
          src={postingImg ? postingImg : defaultTipImage}
          alt="포스팅 이미지"
          className="h-full w-full object-cover object-center"
        />
      </figure>

      <footer className="flex h-auto flex-col justify-between gap-0.5 px-3 pb-0.5 pt-3">
        <p className="text-body-1 text-black">{content}</p>
        <LabelList data={label} />
      </footer>
    </article>
  );
};

export default PostingCard;
