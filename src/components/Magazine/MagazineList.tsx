import useFetch from '@/hooks/useFetch';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import { Swiper, SwiperSlide } from 'swiper/react';
import Magazine from './Magazine';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const MagazineList = () => {
  const baseUrl = `${pb.baseUrl}/api/collections/magazine/records`;
  const { status, error, data } = useFetch(baseUrl);

  const magazineData = data && Array.isArray(data.items) ? data.items : [];

  if (status === 'loading') {
    return <LoadingSpinner className="h-64 w-full" />;
  }

  if (status === 'error') {
    return (
      <p>매거진 데이터를 로드하는 데 오류가 발생했습니다: {error?.message}</p>
    );
  }

  if (magazineData.length === 0) {
    return <p>매거진 데이터가 없습니다.</p>;
  }

  return (
    <div className="relative">
      <Swiper
        className="mySwiper"
        modules={[Keyboard, Pagination, Navigation]}
        slidesPerView={3}
        spaceBetween={160}
        centeredSlides={true}
        loop
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        grabCursor={true}
        aria-label="매거진 리스트"
      >
        {magazineData.map((item: any) => (
          <SwiperSlide key={item.id} aria-label={`Slide ${item.id}`}>
            <Magazine
              id={item.id}
              label={item.label}
              title={item.title}
              content={item.content}
              img={getPbImageURL(pb.baseUrl, item, 'photo')}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="swiper-button-prev cursor-pointer rounded-full p-2 hover:bg-gray-100 focus:bg-gray-100"
        type="button"
      >
        <span className="sr-only">이전 슬라이드</span>
      </button>
      <button
        className="swiper-button-next cursor-pointer rounded-full p-2 hover:bg-gray-100 focus:bg-gray-100"
        type="button"
      >
        <span className="sr-only">다음 슬라이드</span>
      </button>
    </div>
  );
};

export default MagazineList;
