import { Link, useParams } from 'react-router-dom';
import LabelList from '@/components/Label/LabelList';

interface ArticleProps {
  type?: 'party' | 'tip'; // 'party' 또는 'tip' 타입 구분
  party_name: string;
  partyImg: string;
  partyImgAlt: string;
  party_about: string;
  profile_photo: string;
  leaderImgAlt: string;
  nickname: string;
}

const Article = ({
  type = 'party',
  party_name,
  partyImg,
  partyImgAlt,
  party_about,
  profile_photo,
  leaderImgAlt,
  nickname,
}: ArticleProps) => {
  const { party_id, tipId } = useParams();

  const getLink = () => {
    if (type === 'party') {
      return `/home/party/${party_id}`;
    } else if (type === 'tip') {
      return `/community/tip/${tipId}`;
    }
    return `/home/party/${party_id}`;
  };

  return (
    <li className="list-none border-b border-b-gray-100 p-2">
      <Link
        to={getLink()}
        className="flex flex-row items-center gap-3 leading-tight"
      >
        <img
          src={partyImg}
          alt={partyImgAlt}
          className="h-28 w-20 object-cover"
        />
        <div aria-label="파티 정보" role="group">
          <span aria-label="파티 제목" className="text-sub-1">
            {party_name}
          </span>
          <p className="text-sub-2 text-gray-300">{party_about}</p>
          <LabelList data={[]} />
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
