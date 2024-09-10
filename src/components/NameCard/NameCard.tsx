import { Link } from 'react-router-dom';
import DefaultProfileSVG from '../DefaultProfileSVG/DefaultProfileSVG';
import MiniButton from '../Buttons/MiniButton';

interface NameCardProps {
  name: string;
  subtext?: string;
  profileImg?: string | null;
  type:
    | 'editProfile'
    | 'viewProfile'
    | 'followingBtn'
    | 'followingText'
    | 'viewParty';
  id?: string;
}

const NameCard = ({ name, subtext, profileImg, type, id }: NameCardProps) => {
  const handleFollowing = () => {
    console.log('팔로우');
    // 팔로우 눌렀을 때 로직 설정
  };
  const renderActionButton = () => {
    switch (type) {
      case 'editProfile':
        return (
          <MiniButton
            link={`/home/profile/edit/${id}`}
            buttonContent={'프로필 수정'}
          />
        );
      case 'viewProfile':
        return (
          <MiniButton
            link={`/home/profile/${id}`}
            buttonContent={'프로필 보기'}
          />
        );
      case 'followingBtn':
        return (
          <MiniButton onClick={handleFollowing} buttonContent={'팔로우'} />
        );
      case 'followingText':
        return (
          <button
            type="button"
            onClick={handleFollowing}
            className="absolute right-[0.44rem] top-2/4 -translate-y-1/2 transform text-body-1 text-mainblue"
          >
            팔로우
          </button>
        );
      case 'viewParty':
        return (
          <Link
            to={`/home/party/${id}`}
            className="absolute right-[0.44rem] top-2/4 -translate-y-1/2 transform text-body-1 text-mainblue"
          >
            파티보기
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex h-[2.5rem] w-[21rem] items-start justify-center gap-3">
      {profileImg ? (
        <img
          className="mr-1.5 h-[2.5rem] w-[2.5rem] rounded-full object-cover"
          src={profileImg}
          alt="프로필"
        />
      ) : (
        <span className="mr-1.5 h-[2.5rem] w-[2.5rem]">
          <DefaultProfileSVG size={40} />
        </span>
      )}
      <div className="flex w-[17.75rem] flex-col gap-1">
        <span className="text-body-1" aria-label="사용자 닉네임">
          {name}
        </span>
        {/* aria-label="파티 소개"라고 넣어놨는데 티어가 들어가게된다면 조건 하나더 처리해야될듯 */}
        {subtext ? (
          <span className="text-caption text-gray-300" aria-label="파티 소개">
            {subtext}
          </span>
        ) : null}
      </div>

      {renderActionButton()}
    </div>
  );
};

export default NameCard;