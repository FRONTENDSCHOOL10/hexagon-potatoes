import LabelList from '@/components/Label/LabelList';
import NameCard from '@/components/NameCard/NameCard';
import PostActionBar from '@/components/PostActionBar/PostActionBar';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import pb from '@/utils/pocketbase';

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
    };
  };
}

// 컴포넌트 props 타입 정의
interface PropTypes {
  item: InstaPostingItem;
}

const InstaPosting = ({ item }: PropTypes) => {
  const url = `${pb.baseUrl}`;
  if (!item) return null;
  const authorId = item.expand?.author_id;

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
      {authorId && (
        <NameCard
          name={authorId.nickname}
          profileImg={
            authorId.profile_photo
              ? getPbImageURL(url, authorId, 'profile_photo')
              : null
          }
          type="followingText"
        />
      )}

      {item.photo && (
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          slidesPerView="auto"
          className="mySwiper"
        >
          {item.photo.map((key, index) => (
            <SwiperSlide key={key}>
              <img
                className="h-[20.9rem] w-[21rem] bg-[#F2F2F2] object-cover"
                src={getPbImagesURL(index, item)}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <p className="w-[21rem] text-body-2">{item.content}</p>
      {Array.isArray(item.tag) && item.tag.length > 0 && (
        <LabelList data={item.tag} />
      )}

      <PostActionBar
        postId={item.id}
        onBookmark={handleBookmark}
        onShare={handleShare}
        date={item.created}
        type="boast"
      />
    </article>
  );
};

export default InstaPosting;
