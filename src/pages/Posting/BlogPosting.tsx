import LabelList from '@/components/Label/LabelList';
import NameCard from '@/components/NameCard/NameCard';
import PostActionBar from '@/components/PostActionBar/PostActionBar';
import { formatDateLong, formatDateString } from '@/utils/dateFormatter';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import interleaveContent from '@/utils/seperateTextAndImages';
import React, { useCallback } from 'react';

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
  type?: 'magazine' | 'tip';
}

const url = `${pb.baseUrl}`;

const BlogPosting = ({ item, type }: PropTypes) => {
  if (!item) return null;
  const authorId = item.expand?.author_id;

  const handleBookmark = useCallback(() => {
    // 북마크 처리 로직
    console.log('북마크 클릭');
  }, []);

  const handleShare = useCallback(() => {
    // 공유 처리 로직
    console.log('공유 클릭');
  }, []);

  const interleavedContent = interleaveContent(item.content, item.photo);

  // <br> 태그를 \n으로 변환하는 함수
  const formatContent = (content: string) => {
    return content.replace(/<br\s*\/?>/gi, '\n');
  };

  return (
    <article className="pretendard mb-[2.56rem] flex flex-col pb-[0.75rem]">
      <header className="flex min-h-[11.38rem] flex-col bg-[#D9D9D9] px-[0.75rem] pb-[0.62rem] pt-[2.81rem] [box-shadow:0px_0px_6px_0px_rgba(0,_0,_0,_0.12)]">
        <h2 className="mb-[0.38rem] text-h1 text-black">{item.title}</h2>
        <time
          aria-label="작성날짜"
          className="mb-[1.31rem] h-[1.0625rem] text-sub-2 leading-[1.0625rem] text-gray-300"
          dateTime={formatDateString(item.created)}
        >
          {formatDateLong(item.created)}
        </time>
        <NameCard
          name={authorId.nickname}
          subtext={authorId.user_email}
          profileImg={
            authorId.profile_photo
              ? getPbImageURL(url, authorId, 'profile_photo')
              : null
          }
          type={'followingText'}
          id={''}
        />
      </header>

      <div className="flex flex-col gap-3 px-[0.75rem]">
        <LabelList data={item.tag} />
        {type === 'magazine' ? (
          <>
            {item.photo && (
              <img
                className="w-[21rem] object-cover object-center"
                src={getPbImageURL(url, item)}
                alt="게시물"
              />
            )}
            <p className="whitespace-pre-line text-body-2">
              {formatContent(item.content)}
            </p>
          </>
        ) : (
          interleavedContent.map((contentItem, index) => (
            <React.Fragment key={index}>
              {contentItem.type === 'text' ? (
                <p className="whitespace-pre-line text-body-2">
                  {formatContent(contentItem.content)}
                </p>
              ) : (
                <img
                  className="w-[21rem] object-cover object-center"
                  src={getPbImagesURL(Math.floor(index / 2), item)}
                  alt={`게시물 이미지 ${index - 1}`}
                />
              )}
            </React.Fragment>
          ))
        )}

        <PostActionBar
          postId={item.id}
          onBookmark={handleBookmark}
          onShare={handleShare}
          date={item.created}
          type={type}
        />
      </div>
    </article>
  );
};

export default BlogPosting;
