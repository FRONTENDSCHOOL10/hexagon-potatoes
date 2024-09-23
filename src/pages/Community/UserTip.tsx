import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import useFetch from '@/hooks/useFetch';
import BlogPosting from '../Posting/BlogPosting';
import { Helmet } from 'react-helmet-async';

const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/tip/records`;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const BlogPostingWithAnimation = ({ item, type }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.3, 1, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 0.15, 0.2], [5, 2, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.95, 1, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        scale,
      }}
      variants={itemVariants}
      className="relative mb-4"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          filter: useTransform(blurValue, (value) => `blur(${value}px)`),
        }}
      />
      <BlogPosting item={item} type={type} />
    </motion.div>
  );
};

const UserTip = () => {
  const { status, data } = useFetch(ENDPOINT, 'author_id');

  if (status !== 'success') return null;

  const tipData = data.items;
  if (!tipData || tipData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <Helmet>
        <title>유저 팁 | Shipmate</title>
        <meta
          name="description"
          content="사용자들이 공유한 유용한 팁을 확인하세요."
        />
        <meta name="keywords" content="유저 팁, 공유, 쉽메이트" />

        <meta property="og:title" content="유저 팁 | Shipmate" />
        <meta
          property="og:description"
          content="사용자들이 공유한 유용한 팁을 확인하세요."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://sheepmate.netlify.app/home/community/userTip"
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/1044545035221352531/1287620951554527324/landing_1.png?ex=66f235f5&is=66f0e475&hm=143d17f0a2bdb88e9772825fab5b924e2cc2fdea9167cbe4dcc1bc82344d4b76&" // 이 부분은 실제 이미지 URL로 변경하세요
        />
      </Helmet>

      <h1 className="sr-only">유저팁</h1>
      <motion.section
        className="mt-3 flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tipData?.map((d: any) => (
          <BlogPostingWithAnimation key={d.id} item={d} type="tip" />
        ))}
      </motion.section>
    </>
  );
};

export default UserTip;
