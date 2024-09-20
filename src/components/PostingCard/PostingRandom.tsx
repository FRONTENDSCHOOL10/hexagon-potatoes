import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import PostingCard from '@/components/PostingCard/PostingCard';

interface PropTypes {
  reloadCount: number;
}

const basePostingUrl = `${pb.baseUrl}api/collections/posting/records`;

const PostingRandom = ({ reloadCount }: PropTypes) => {
  const { status, error, data } = useFetch(basePostingUrl, 'author_id');
  const [randomPosting, setRandomPosting] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomPosting = () => {
      if (status === 'loading') {
        setLoading(true);
      } else if (status === 'success' && data?.items.length > 0) {
        const postings = data.items;
        const randomIndex = Math.floor(Math.random() * postings.length);
        const selectedPosting = postings[randomIndex];

        const profileImg = getPbImageURL(
          pb.baseUrl,
          selectedPosting.expand.author_id,
          'profile_photo'
        );

        setRandomPosting({
          user: selectedPosting.expand.author_id.nickname,
          content: selectedPosting.content,
          label: selectedPosting.tag,
          postingImg: selectedPosting.photo,
          profileImg: profileImg,
          data: selectedPosting,
        });
      }
      setLoading(false); // 로딩 완료
    };

    fetchRandomPosting();

    // 에러 처리
    if (status === 'error') {
      console.error('포스팅 데이터를 가져오는 중 오류가 발생했습니다:', error);
      setLoading(false);
    }
  }, [reloadCount, status, data]);

  if (loading) {
    return <div aria-live="polite">로딩 중...</div>;
  }

  if (status === 'error' || !randomPosting) {
    return (
      <div aria-live="assertive">{error?.message || '포스팅이 없습니다.'}</div>
    );
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
