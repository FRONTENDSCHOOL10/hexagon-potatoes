import { Link, useParams } from 'react-router-dom';
import LabelList from '@/components/Label/LabelList';
interface propsType {
  party_name: string;
  // blob 객체가 될지 잘 모르겠다..
  partyImg: string;
  partyImgAlt: string;
  party_about: string;
  // blob 객체가 될지 잘 모르겠다..
  profile_photo: string;
  leaderImgAlt: string;
  nickname: string;
}

const Article = ({
  party_name,
  partyImg,
  partyImgAlt,
  party_about,
  profile_photo,
  leaderImgAlt,
  nickname,
}: propsType) => {
  const { party_id } = useParams();

  return (
    <li className="list-none border-b border-b-gray-100 p-2">
      <Link
        to={`/home/party/${party_id}`}
        className="flex flex-row items-center gap-3 leading-tight"
      >
        <img
          src={partyImg}
          // 파일명을 사용하면 좋을 것 같은데 db에 어떻게 저장될지 모르겠다.
          alt={partyImgAlt}
          className="h-28 w-20 rounded-lg object-cover"
        />
        <div aria-label="파티 정보" role="group">
          <span aria-label="파티 제목" className="text-sub-1">
            {party_name}
          </span>
          {/* 파티글 대표 이미지 */}
          <p className="text-sub-2 text-gray-300">{party_about}</p>
          {/* 라벨은 컴포넌트로 만들면 어떤가 */}
          <LabelList />
          <img
            className="mr-2 inline-block size-5"
            src={profile_photo}
            alt={`${leaderImgAlt}님의 프로필`}
          />
          <span className="align-middle text-caption">{nickname}</span>
        </div>
      </Link>
    </li>
  );
};

export default Article;
