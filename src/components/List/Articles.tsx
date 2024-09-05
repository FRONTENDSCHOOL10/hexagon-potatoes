import { Link, useParams } from "react-router-dom";

interface propsType {
  party_name: string;
  // blob 객체가 될지 잘 모르겠다..
  partyImg: string;
  partyImgAlt: string;
  party_about: string;
  // blob 객체가 될지 잘 모르겠다..
  profile_photo: string;
  leaderImgAlt: string;
}

const Articles = ({
  party_name,
  partyImg,
  partyImgAlt,
  party_about,
  profile_photo,
  leaderImgAlt,
}: propsType) => {
  const {party_id}  = useParams()
    
  return (
    <li>
        <Link to={`/${party_id}`}>
          <span>{party_name}</span>
          {/* 파티글 대표 이미지 */}
          <img src={partyImg} alt={partyImgAlt} />
          <p>{party_about}</p>
          {/* 라벨은 컴포넌트로 만들면 어떤가 */}
          {/* <Label /> */}
          <img src={profile_photo} alt={leaderImgAlt} />
        </Link>
    </li>
  );
};

export default Articles;
