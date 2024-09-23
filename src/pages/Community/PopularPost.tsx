import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import PostingCard from '@/components/PostingCard/PostingCard';
import useFetch from '@/hooks/useFetch';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import { Helmet } from 'react-helmet-async';

const containerVariants: Variants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PostingCardWithAnimation = ({ data, url }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.3, 1, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 0.15, 0.2], [2, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.95, 1, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        filter: useTransform(blurValue, (value) => `blur(${value}px)`),
        scale,
      }}
      variants={itemVariants}
      className="mb-4"
    >
      <PostingCard
        profileImg={
          data?.expand?.author_id?.profile_photo
            ? getPbImageURL(url, data?.expand?.author_id, 'profile_photo')
            : ''
        }
        user={data.expand.author_id.nickname}
        postingImg={data.photo}
        content={data.content}
        label={data.tag}
        data={data}
      />
    </motion.div>
  );
};

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

        <meta property="og:title" content="인기 게시물 | Shipmate" />
        <meta
          property="og:description"
          content="현재 인기 있는 게시물을 확인해보세요."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://sheepmate.netlify.app/home/community/popularPost"
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/1044545035221352531/1287620951554527324/landing_1.png?ex=66f235f5&is=66f0e475&hm=143d17f0a2bdb88e9772825fab5b924e2cc2fdea9167cbe4dcc1bc82344d4b76&" // 이 부분은 실제 이미지 URL로 변경하세요
        />
      </Helmet>

      <h1 className="sr-only">인기포스트</h1>
      <motion.section
        className="mt-3 flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedPostData?.map((d: any) => (
          <PostingCardWithAnimation key={d.id} data={d} url={url} />
        ))}
      </motion.section>
    </>
  );
};

export default PopularPost;
