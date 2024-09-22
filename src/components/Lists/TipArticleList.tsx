import { motion } from 'framer-motion';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import { memo } from 'react';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import Article from './Article';

interface PropTypes {
  data: {
    type: 'tip';
    title: string;
    photo: string | null;
    content: string;
    author_photo: string;
    author_nickname: string;
    id: string;
    collectionId: string;
    tag: string[];
    expand?: {
      author_id?: {
        profile_photo: string | null;
        collectionId: string;
        nickname: string;
        id: string;
      };
    };
  }[];
}

const url = `${pb.baseUrl}`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 10,
    },
  },
};

const TipArticleList = ({ data }: PropTypes) => {
  return (
    <motion.ul
      className="flex w-full flex-col gap-y-3"
      aria-label="팁 목록"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data?.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          <Article
            type={'tip'}
            content_title={item.title}
            content_img={
              item.photo ? getPbImagesURL(0, item) : DefaultProfileSVG
            }
            subtitle={item.content}
            profile_photo={
              item?.expand?.author_id?.profile_photo
                ? getPbImageURL(url, item.expand?.author_id, 'profile_photo')
                : DefaultProfileSVG
            }
            nickname={item.expand?.author_id?.nickname}
            id={item.id}
            label={item.tag}
            level={3}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default memo(TipArticleList);
