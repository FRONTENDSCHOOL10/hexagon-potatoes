import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  const navigate = useNavigate()
  
  const handleClickList = () => {
    // 해당 모집글로 이동하는 코드
    navigate(`/${party_id}`)
  }
  
  return (
    <li onClick={handleClickList}>
      <h3>{party_name}</h3>
      {/* 파티글 대표 이미지 */}
      <img src={partyImg} alt={partyImgAlt} />
      <p>{party_about}</p>
      {/* 라벨은 컴포넌트로 만들면 어떤가 */}
      {/* <Label /> */}
      <img src={profile_photo} alt={leaderImgAlt} />
    </li>
  );
};

export default Articles;
