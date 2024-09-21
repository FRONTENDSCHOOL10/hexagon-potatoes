import { Link } from 'react-router-dom';
import getPbImageURL from '@/utils/getPbImageURL';

// 데이터 가져오기
interface PropTypes {
  // blob 객체일수도
  gradeImg?: string;
  profile_photo: string;
  nickname: string;
  itemImgAlt?: string;
  rating: string;
  member_grade?: string;
  member_description?: string;
  user_id: number;
  party_number: number;
}

const PartyLeader = ({ item }) => {
  const imgUrl = getPbImageURL(
    'https://hexagon-potatoes.pockethost.io',
    item,
    'profile_photo'
  );

  return (
    <li
      aria-labelledby=""
      className="relative list-none rounded-md p-3 shadow-shadow-blue"
    >
      <Link to={`/${item.id}`} className="flex flex-col gap-3.5">
        <div
          aria-label="사용자 프로필"
          role="group"
          className="grid grid-cols-[auto_auto_minmax(30px,_1fr)_auto] border-b border-b-gray-100 pb-[0.88rem]"
        >
          <p className="mr-1.5 place-content-center text-sub-1">
            {item.nickname}
          </p>
          <img
            src={item.profile_photo || 'assets/shipmatelogo.webp'}
            alt={item.itemImgAlt}
            className="absolute right-3 size-14"
          />
          {/* 더 적절한 label을 쓰고 싶다 */}

          {/* 사용자 등급 db 필요 */}
          <span
            className="place-content-center pr-1 text-caption text-gray-200"
            aria-label="사용자 등급"
          >
            GOLD
          </span>
          <svg className="h-4 w-4 self-center" aria-labelledby="icon-alt">
            <title id="icon-alt">사용자 등급 아이콘</title>
            <use href="/assets/sprite-sheet.svg#goldship"></use>
          </svg>
          <img
            src={item.gradeImg || 'assets/shipmatelogo.webp'}
            className="w-4 self-center"
            alt="사용자 등급"
          />
          <p className="col-span-3 row-span-2 mt-[0.38rem] line-clamp-2 text-ellipsis break-all text-body-2 text-gray-300">
            {item.user_desc}
          </p>
        </div>
        <div
          role="group"
          aria-label="사용자 추가 정보"
          className="text-caption"
        >
          <svg className="mr-2 inline-block h-3 w-3 fill-current align-text-top text-[#FFD943]">
            <use href="/assets/sprite-sheet.svg#star" />
          </svg>

          <span aria-label="사용자 평점" className="mr-2 text-gray-300">
            {item.rating}
          </span>
          <span aria-label="진행중인 파티" className="text-mainblue">
            {item.participating_party.length > 0
              ? `현재 진행중인 파티 ${item.participating_party.length}개`
              : '모집중인 파티 없음'}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default PartyLeader;
