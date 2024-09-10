import PostActionBar from '@/components/PostActionBar/PostActionBar';

const BlogPosting = ({ item }) => {
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
        <h1 className="mb-[0.38rem] text-h1 text-black">title</h1>
        {/* 아래 날짜 들어와야됌 */}
        <time
          aria-label="작성날짜"
          className="text-sub-2 mb-[1.31rem] h-[1.0625rem] font-light leading-[1.0625rem] text-gray-300"
          dateTime=""
        >
          year. mm. nn 00:00
        </time>
        {/* 아래 네임카드 들어와야됌 */}
        <div className="h-[2.5rem] w-[21rem] px-[0.75rem]"></div>
      </header>
      <div className="flex flex-col gap-3 px-[0.75rem]">
        <ul className="flex h-[1.38rem] w-[21rem] items-start gap-3 self-stretch">
          {/* 여기도 라벨 컴포넌트 가져다가 쓰면됌 */}
        </ul>
        {/* 텍스트 컨텐츠 어떻게 만들지 유진님이랑 상의 */}
        <p className="text-body-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ea
          quo sit, blanditiis placeat qui animi porro ipsa autem hic modi optio
          aspernatur, suscipit, deleniti distinctio nihil consequuntur vitae
          exercitationem! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita ea quo sit, blanditiis placeat qui animi porro ipsa
          autem hic modi optio aspernatur, suscipit, deleniti distinctio nihil
          consequuntur vitae exercitationem!
        </p>
        <PostActionBar
          postId={item.id}
          onLike={handleLike}
          onBookmark={handleBookmark}
          onShare={handleShare}
        />
      </div>
    </article>
  );
};

export default BlogPosting;
