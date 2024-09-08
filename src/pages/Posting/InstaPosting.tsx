import PostActionBar from '@/components/PostActionBar/PostActionBar';
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
  // 필요한 경우 여기에 추가 필드를 정의할 수 있습니다.
  // 예: author_id: string;
}

// 컴포넌트 props 타입 정의
interface InstaPostingProp {
  item: InstaPostingItem;
}

const InstaPosting = ({ item }: InstaPostingProp) => {
  const ENDPOINT = 'https://hexagon-potatoes.pockethost.io/';
  if (!item) return null;

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
    <article className="mb-[2.56rem] flex flex-col gap-3 p-3">
      {/* 프로필 부분 여기는 나중에 주비님이 작업하신 내용 참고해서 바꿀 예정 */}
      <div className="h-[2.5rem] w-[21rem]"></div>
      {item.photo && (
        <img
          className="h-[20.9rem] w-[21rem] bg-[#F2F2F2] object-cover"
          src={getPbImageURL(ENDPOINT, item)}
          alt=""
        />
      )}
      <p className="w-[21rem] text-body-2">{item.content}</p>
      <ul className="flex h-[1.38rem] w-[21rem] items-start gap-3 self-stretch">
        {/* 여기도 라벨 컴포넌트 가져다가 쓰면됌 */}
      </ul>

      <PostActionBar
        postId={item.id}
        onLike={handleLike}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />
    </article>
  );
};

export default InstaPosting;
