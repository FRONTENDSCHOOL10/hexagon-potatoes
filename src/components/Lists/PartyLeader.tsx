import { Link } from "react-router-dom";

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
  
}

const PartyLeader = ({
  profile_photo,
  nickname,
  itemImgAlt,
  rating,
  member_grade,
  member_description,
  user_id,
  gradeImg
}: propsType) => {
  
  return (
    <li aria-labelledby="">
      <Link to={`/${user_id}`}>
        <img src={profile_photo} alt={itemImgAlt} />
        {/* 더 적절한 label을 쓰고 싶다 */}
        <p>{nickname}</p>
        {/* 사용자 등급 db 필요 */}
        <span aria-label="사용자 등급">{member_grade}</span>
        <img src={gradeImg} alt="사용자 등급" />
        {/* 자기 소개 db 필요 */}
        <p>{member_description}</p>
        <div role="group" aria-label="사용자 추가 정보">
          <span aria-label="사용자 평점">{rating}</span>
          <span aria-label="진행중인 파티">현재 진행중인 파티 { }개</span>
        </div>
      </Link>
    </li>
  );
};

export default PartyLeader;
