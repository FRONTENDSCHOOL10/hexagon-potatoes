import { Link } from 'react-router-dom';

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
  return (
    <Link to={`/home/instaPosting/${id}`}>
      <figure className="flex-[1_0_0]; flex h-[13.6rem] w-40 flex-col items-center rounded-md bg-[#FFF] shadow-shadow-blue">
        <img
          className="h-[10.3rem] w-[10rem] bg-[rgba(0,_0,_0,_0.05)]"
          src={photo}
          alt="포스팅 이미지"
        />
        <figcaption className="flex flex-col items-start gap-1 self-stretch p-2">
          <caption className="text-caption text-gray-300">{nickname}</caption>
          <h3 className="text-sub-1 w-full overflow-hidden text-ellipsis whitespace-nowrap text-black">
            {content}
          </h3>
        </figcaption>
      </figure>
    </Link>
  );
};

export default MiniPostingCard;
