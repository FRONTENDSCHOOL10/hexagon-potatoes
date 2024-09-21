import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Card = () => {
  const cardFont =
    'pretendard text-[0.75rem] leading-[0.875rem] font-bold not-italic text-white absolute';
  return (
    <Swiper
      spaceBetween={17}
      slidesPerView={'auto'}
      style={{
        margin: 0,
        height: '176px',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <SwiperSlide
        style={{
          height: '100%',
          width: '17.0625rem',
          objectFit: 'cover',
          boxShadow: '0px 0px 15px 0px rgba(10, 115, 249, 0.15)',
          borderRadius: '0.9375rem',
          backgroundImage: 'url(/assets/card.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          position: 'relative',
        }}
      >
        <span className={`${cardFont} left-[1.19rem] top-[1rem]`}>
          **** **** **** 1564
        </span>
        <span className={`${cardFont} left-[1.19rem] top-[1.81rem]`}>
          08/27
        </span>
        <span className={`${cardFont} bottom-[1.13rem] left-[1.19rem]`}>
          NH농협 NANA체크카드
        </span>
        <img
          className="absolute bottom-[1.19rem] right-[1rem] h-[0.75rem] w-10"
          src="/assets/visa.png"
          alt="NH농협 NANA체크카드"
        />
        <div className="absolute right-[1.125rem] top-[1.125rem] flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-slate-50">
          <svg
            className="absolute h-[1.25rem] w-[1.25rem]"
            aria-hidden="true"
            viewBox="0 0 20 20"
          >
            <use width="20" height="20" href="/assets/sprite-sheet.svg#check" />
          </svg>
        </div>
      </SwiperSlide>

      <SwiperSlide
        style={{
          height: '100%',
          width: '17.0625rem',
          objectFit: 'cover',
          boxShadow: '0px 0px 15px 0px rgba(10, 115, 249, 0.15)',
          borderRadius: '0.9375rem',
          background: 'var(--gray100, #EDF1F6)',
          position: 'relative',
        }}
      >
        <span className="absolute left-[6.13rem] top-[6.5rem] font-[Pretendard] text-[0.875rem] font-bold not-italic leading-[1.375rem] text-[#CAD4E7]">
          카드 추가하기
        </span>
        <button className="absolute left-[7.31rem] top-[3.37rem] flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <svg className="h-[1.24775rem] w-[1.24663rem] fill-current text-white">
            <use href="/assets/sprite-sheet.svg#plus" />
          </svg>
        </button>
      </SwiperSlide>
      <SwiperSlide
        style={{
          height: '100%',
          width: '17.0625rem',
          objectFit: 'cover',
          boxShadow: '0px 0px 15px 0px rgba(10, 115, 249, 0.15)',
          borderRadius: '0.9375rem',
          background: 'var(--gray100, #EDF1F6)',
          position: 'relative',
        }}
      >
        <button
          type="button"
          aria-labelledby="add-card-label"
          className="absolute left-[7.31rem] top-[3.37rem] flex h-10 w-10 items-center justify-center rounded-full bg-gray-200"
        >
          <svg className="h-[1.24775rem] w-[1.24663rem] fill-current text-white">
            <use href="/assets/sprite-sheet.svg#plus" />
          </svg>
        </button>
        <span
          id="add-card-label"
          className="absolute left-[6.13rem] top-[6.5rem] font-[Pretendard] text-[0.875rem] font-bold not-italic leading-[1.375rem] text-[#CAD4E7]"
        >
          카드 추가하기
        </span>
      </SwiperSlide>
    </Swiper>
  );
};

export default Card;
