import { Link } from 'react-router-dom';

interface SquarePostingCardProp {
  id: string;
  img: string;
}

const SquarePostingCard = ({ id, img }: SquarePostingCardProp) => {
  return (
    <li className="[list-style:none]">
      <Link
        to={`/home/instaPosting/${id}`}
        className="flex h-[6.6875rem] w-[6.6875rem] flex-shrink-0 bg-[#F2F2F2]"
      >
        {/* 적당한 alt 속성값이 떠오르지 않아 추후에 gemini 고려 */}
        {/* 사용할때 img 프롭 src에 넣어야됌 */}
        <img src="" alt={img} />
      </Link>
    </li>
  );
};

export default SquarePostingCard;
