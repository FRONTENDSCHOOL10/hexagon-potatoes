import LabelList from '@/components/Label/LabelList';
import NameCard from '@/components/NameCard/NameCard';
import PostActionBar from '@/components/PostActionBar/PostActionBar';
import { formatDateLong, formatDateString } from '@/utils/dateFormatter';
import getPbImageURL from '@/utils/getPbImageURL';

interface PocketBaseRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  [key: string]: any;
}

// InstaPosting 아이템의 타입 정의
interface InstaPostingItem extends PocketBaseRecord {
  photo: string;
  content: string;
  expand: {
    author_id: {
      id: string;
      profile_photo: string;
      nickname: string;
      collectionId: string;
      user_email: string;
    };
  };
}

// 컴포넌트 props 타입 정의
interface PropTypes {
  item: InstaPostingItem;
}

const BlogPosting = ({ item }: PropTypes) => {
  const ENDPOINT = 'https://hexagon-potatoes.pockethost.io/';
  if (!item) return null;
  const authorId = item.expand?.author_id;
  const defaultTipImage = '/assets/shipmatelogo.png'; // 기본 팁 이미지 URL

  const handleLike = () => {
    // 좋아요 처리 로직
    console.log('좋아요 클릭');
  };

  const handleBookmark = () => {
    // 북마크 처리 로직
    console.log('북마크 클릭');
  };

  const handleShare = () => {
    // 공유 처리 로직
    console.log('공유 클릭');
  };
  return (
    <article className="mb-[2.56rem] flex flex-col pb-[0.75rem]">
      <header className="flex min-h-[11.38rem] flex-col bg-[#D9D9D9] px-[0.75rem] pb-[0.62rem] pt-[2.81rem] [box-shadow:0px_0px_6px_0px_rgba(0,_0,_0,_0.12)]">
        <h1 className="mb-[0.38rem] text-h1 text-black">{item.title}</h1>
        {/* 아래 날짜 들어와야됌 */}
        <time
          aria-label="작성날짜"
          className="mb-[1.31rem] h-[1.0625rem] text-sub-2 font-light leading-[1.0625rem] text-gray-300"
          dateTime={formatDateString(item.created)}
        >
          {formatDateLong(item.created)}
        </time>
        <NameCard
          name={authorId.nickname}
          subtext={authorId.user_email}
          profileImg={
            authorId.profile_photo
              ? getPbImageURL(ENDPOINT, authorId, 'profile_photo')
              : null
          }
          type={'followingText'}
          id={''}
        />
      </header>

      <div className="flex flex-col gap-3 px-[0.75rem]">
        <LabelList data={item.tag} />
        {item.photo && (
          <img
            className="w-[21rem] object-cover object-center"
            // 이미지 높이값 따로 안정함
            src={getPbImageURL(ENDPOINT, item)}
            alt="게시물" //적절한 alt 속성값을 찾지 못함
          />
        )}
        <p className="text-body-2">{item.content}</p>
        <PostActionBar
          postId={item.id}
          onLike={handleLike}
          onBookmark={handleBookmark}
          onShare={handleShare}
          date={item.created}
        />
      </div>
    </article>
  );
};

export default BlogPosting;
