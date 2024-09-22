import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import useFetch from '@/hooks/useFetch';
import BlogPosting from '../Posting/BlogPosting';
import { Helmet } from 'react-helmet-async';

const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/magazine/records`;

const AnimatedBlogPosting = ({ item, type }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3], [0.95, 1, 1]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0)']
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        scale,
        backgroundColor,
      }}
      className="mb-4 overflow-hidden" // 각 게시물 사이에 간격과 둥근 모서리 추가
    >
      <BlogPosting item={item} type={type} />
    </motion.div>
  );
};

const Magazine = () => {
  const { status, data } = useFetch(ENDPOINT, 'author_id');

  if (status !== 'success') return null;
  const tipData = data?.items;

  if (!tipData || tipData.length === 0) {
    return <div>No data available</div>;
  }
  const container = {
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

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <>
      <Helmet>
        <title>매거진 | Shipmate</title>
        <meta name="description" content="최신 매거진 게시물을 확인해보세요." />
        <meta name="keywords" content="매거진, 최신 게시물, 쉽메이트" />
      </Helmet>
      <h1 className="sr-only">매거진</h1>
      <motion.section
        className="mt-3 flex flex-col gap-3"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {tipData?.map((d: any) => (
          <motion.div key={d.id} variants={item}>
            <AnimatedBlogPosting key={d.id} item={d} type="magazine" />
          </motion.div>
        ))}
      </motion.section>
    </>
  );
};

export default Magazine;
