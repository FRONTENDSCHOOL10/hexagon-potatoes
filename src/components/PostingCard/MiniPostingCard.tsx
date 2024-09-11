import { Link } from 'react-router-dom';
import defaultTipImageSrc from '/assets/shipmatelogo.png';

interface MiniPostingCardProp {
  nickname: string;
  content: string;
  id: string;
  photo: string;
}

const MiniPostingCard = ({
  nickname,
  content,
  id,
  photo,
}: MiniPostingCardProp) => {
  const defaultTipImage = '/assets/shipmatelogo.png'; // 기본 팁 이미지 URL

  return (
    <Link to={`/home/community/boast/${id}`}>
      <figure
        aria-labelledby={`post-title-${id}`}
        className="flex-[1_0_0]; flex h-[13.6rem] w-40 flex-col items-center overflow-hidden rounded-md bg-[#FFF] shadow-shadow-blue"
      >
        <img
          className="h-[10.3rem] w-full bg-[rgba(0,_0,_0,_0.05)] object-cover"
          src={photo} // null, undefined, 빈 문자열 모두 처리
          alt="포스팅 이미지"
        />

        <figcaption className="flex flex-col items-start gap-1 self-stretch p-2">
          <p className="text-caption text-gray-300">{nickname}</p>
          <h3
            id={`post-title-${id}`}
            className="text-sub-1 w-full overflow-hidden text-ellipsis whitespace-nowrap leading-[1.18rem] text-black"
          >
            {content}
          </h3>
        </figcaption>
      </figure>
    </Link>
  );
};

export default MiniPostingCard;
