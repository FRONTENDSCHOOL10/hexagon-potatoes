import PostingCard from '@/components/PostingCard/PostingCard';
import useFetch from '@/hooks/useFetch';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';

const PopularPost = () => {
  const defaultTipImage = '/assets/shipmatelogo.png'; // 기본 팁 이미지 URL
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io`;
  const postingUrl = `https://hexagon-potatoes.pockethost.io/api/collections/posting/records`;

  const { data, error, status } = useFetch(postingUrl, 'author_id');
  const PostData = data?.items;
  console.log(data?.items[1]);

  return (
    <section className="mt-3 flex flex-col gap-3">
      {PostData?.map((d: any, index: number) => (
        <PostingCard
          key={d.id}
          profileImg={
            d?.expand?.author_id?.profile_photo
              ? getPbImageURL(ENDPOINT, d?.expand?.author_id, 'profile_photo')
              : ''
          }
          user={d.expand.author_id.nickname}
          postingImg={d.photo.length !== 0 ? getPbImagesURL(0, d) : null}
          content={d.content}
          label={d.tag}
        />
      ))}
    </section>
  );
};

export default PopularPost;
