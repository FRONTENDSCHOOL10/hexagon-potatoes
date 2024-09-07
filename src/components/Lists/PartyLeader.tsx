import { Link } from 'react-router-dom';

// 데이터 가져오기
interface propsType {
  // blob 객체일수도
  gradeImg: string;
  profile_photo: string;
  nickname: string;
  itemImgAlt: string;
  rating: string;
  member_grade: string;
  member_description: string;
  user_id: number;
  // 개최한 파티 개수를 어떻게 가져오지 ..
}

const PartyLeader = ({
  profile_photo,
  nickname,
  itemImgAlt,
  rating,
  member_grade,
  member_description,
  user_id,
  gradeImg,
}: propsType) => {
  return (
    <li
      aria-labelledby=""
      className="relative list-none rounded-md p-3 shadow-shadow-blue"
    >
      <Link to={`/${user_id}`} className="flex flex-col gap-3.5">
        <div
          aria-label="사용자 프로필"
          role="group"
          className="grid h-16 grid-cols-[auto_auto_minmax(30px,_1fr)] border-b border-b-gray-100 pb-3.5"
        >
          <img
            src={profile_photo}
            alt={itemImgAlt}
            className="absolute right-0 size-16"
          />
          {/* 더 적절한 label을 쓰고 싶다 */}
          <p className="mr-1.5 place-content-center text-sub-1">{nickname}</p>
          {/* 사용자 등급 db 필요 */}
          <span
            className="place-content-center text-caption text-gray-200"
            aria-label="사용자 등급"
          >
            {member_grade}
          </span>
          <img src={gradeImg} className="w-4 self-center" alt="사용자 등급" />
          {/* 자기 소개 db 필요 */}
          <p className="col-span-3 text-body-2 text-gray-300">
            {member_description}
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
            {rating}
          </span>
          <span aria-label="진행중인 파티" className="text-mainblue">
            {/* 개최한 파티 개수 가져오기 */}
            현재 진행중인 파티 {}개
          </span>
        </div>
      </Link>
    </li>
  );
};

export default PartyLeader;
