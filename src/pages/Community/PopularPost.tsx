import PostingCard from '@/components/PostingCard/PostingCard';
import useFetch from '@/hooks/useFetch';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import { Helmet } from 'react-helmet-async';

const PopularPost = () => {
  const url = `${pb.baseUrl}`;
  const postingUrl = `${url}api/collections/posting/records`;

  const { data, error, status } = useFetch(postingUrl, 'author_id');
  const postData = data?.items;

  const sortedPostData = Array.isArray(postData)
    ? [...postData].sort((a, b) => (b.like || 0) - (a.like || 0))
    : [];

  return (
    <>
      <Helmet>
        <title>인기 게시물 | Shipmate</title>
        <meta
          name="description"
          content="현재 인기 있는 게시물을 확인해보세요."
        />
        <meta name="keywords" content="인기 게시물, 게시판, 쉽메이트" />
      </Helmet>
      <section className="mt-3 flex flex-col gap-3">
        {sortedPostData?.map((d: any, index: number) => (
          <PostingCard
            key={d.id}
            profileImg={
              d?.expand?.author_id?.profile_photo
                ? getPbImageURL(url, d?.expand?.author_id, 'profile_photo')
                : ''
            }
            user={d.expand.author_id.nickname}
            postingImg={d.photo}
            content={d.content}
            label={d.tag}
            data={d}
          />
        ))}
      </section>
    </>
  );
};

export default PopularPost;
