import TipArticleList from '@/components/Lists/TipArticleList';
import MiniPostingCard from '@/components/PostingCard/MiniPostingCard';
import useFetch from '@/hooks/useFetch';
import getRandomItems from '@/utils/getRandomItems';
import { motion } from 'framer-motion';
import { memo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const tipUrl = `${import.meta.env.VITE_PB_URL}/api/collections/tip/records`;
const boastUrl = `${import.meta.env.VITE_PB_URL}/api/collections/posting/records`;

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

const CommunityHome = () => {
  const {
    status: tipStatus,
    error: tipError,
    data: tipData,
  } = useFetch(tipUrl, 'author_id');
  const {
    status: boastStatus,
    error: boastError,
    data: boastData,
  } = useFetch(boastUrl, 'author_id');

  const renderMiniPostingCard = useCallback(
    (d: any) => (
      <motion.div key={d.id} variants={itemVariants}>
        <MiniPostingCard
          id={d?.id}
          nickname={d?.expand?.author_id?.nickname}
          content={d?.content}
          photo={d.photo.length !== 0 ? d : null}
        />
      </motion.div>
    ),
    []
  );

  if (tipStatus !== 'success' || boastStatus !== 'success') return null;

  const tipDatas = tipData.items ?? [];
  const randomTips = getRandomItems(tipDatas, 3);

  const boastDatas = boastData.items ?? [];
  // const randomBoasts = getRandomItems(boastDatas, 2);

  return (
    <>
      <Helmet>
        <title>커뮤니티 홈 | Shipmate</title>
        <meta
          name="description"
          content="쉽메이트 커뮤니티에서 다양한 정보를 공유하고 소통하세요."
        />
        <meta name="keywords" content="커뮤니티, 쉽메이트, 소통, 정보 공유" />
      </Helmet>
      <h1 className="sr-only">커뮤니티 홈</h1>
      <section className="mb-3 flex w-[22.5rem] flex-col items-center justify-center gap-2 self-stretch px-3 py-[0rem]">
        <h2 className="self-stretch pt-3 text-heading-1 text-[black]">
          유저들의 팁
        </h2>

        <TipArticleList data={randomTips} />
      </section>
      <section className="flex w-[22.5rem] flex-col items-center justify-center gap-2 p-3">
        <h2 className="self-stretch pt-3 text-heading-1 text-[black]">
          유저들의 자랑
        </h2>
        <Swiper
          spaceBetween={3}
          slidesPerView={2}
          className="h-[14.8125rem] w-[22.5rem]"
          navigation={true}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {boastDatas.map((d) => (
            <SwiperSlide key={d.id}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {renderMiniPostingCard(d)}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default memo(CommunityHome);
