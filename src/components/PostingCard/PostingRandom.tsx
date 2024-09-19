import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import PostingCard from '@/components/PostingCard/PostingCard';

const basePostingUrl = `${pb.baseUrl}/api/collections/posting/records`;

// 랜덤 포스팅 선택 및 렌더링
const PostingRandom = () => {
  const { status, error, data } = useFetch(basePostingUrl, 'author_id');
  const [randomPosting, setRandomPosting] = useState<any>(null);

  useEffect(() => {
    if (status === 'success' && data?.items.length > 0) {
      // 랜덤 포스팅 선택
      const postings = data?.items;
      const randomIndex = Math.floor(Math.random() * postings.length);
      const selectedPosting = postings[randomIndex];

      const profileImg = getPbImageURL(
        pb.baseUrl,
        selectedPosting.expand.author_id,
        'profile_photo'
      );
      // 필요한 데이터 설정
      setRandomPosting({
        user: selectedPosting.expand.author_id.nickname,
        content: selectedPosting.content,
        label: selectedPosting.tag,
        postingImg: selectedPosting.photo,
        profileImg: profileImg,
        data: selectedPosting,
      });
    }
  }, [status, data]);

  if (status === 'error') {
    return (
      <div>
        {error?.message || '포스팅 데이터를 가져오는 중 오류가 발생했습니다.'}
      </div>
    );
  }

  if (status === 'loading') {
    return <div>로딩 중...</div>;
  }

  if (!randomPosting) {
    return <div>포스팅이 없습니다.</div>;
  }

  return (
    <PostingCard
      user={randomPosting.user}
      content={randomPosting.content}
      postingImg={randomPosting.postingImg}
      profileImg={randomPosting.profileImg}
      label={randomPosting.label}
      data={randomPosting.data}
    />
  );
};

export default PostingRandom;
