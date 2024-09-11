import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Pagination,
  Navigation,
  Keyboard,
  Swiper as SwiperType,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Button from '@/components/Buttons/Button';

// 튜토리얼 슬라이드 데이터
const TUTORIAL_SLIDES = [
  {
    image: '/assets/landing-1.webp',
    alt: '시작 페이지',
    title: '',
    description: '',
  },
  {
    image: '/assets/tutorial-1.webp',
    alt: '첫번째 소개 페이지',
    title: "배송비 걱정 그만! \n'N빵' 하면 부담 없어요",
    description:
      '배송 비용 = 물건 가격 이라 고민했다면? \n쉽메이트에서 공동 구매에 참여하고 배송비를 나눠내면 돼요',
  },
  {
    image: '/assets/tutorial-2.webp',
    alt: '두번째 소개 페이지',
    title: '배송 대행지? 구매대행? \n그런 거 찾지 마세요',
    description:
      '쉽메이트가 배송 대행지를 사용하여 주문부터\n공동 구매 파티장에게 국내 배송까지 도와줘요',
    textColor: 'text-white',
  },
  {
    image: '/assets/tutorial-3.webp',
    alt: '세번째 소개 페이지',
    title: '복잡한 관세 계산도\n쉽메이트가 할게요',
    description:
      '물건의 종류와 가격을 입력하면\n자동으로 관세 계산을 해드릴게요',
  },
  {
    image: '/assets/tutorial-4.webp',
    alt: '네번째 소개 페이지',
    title: '공동 구매 파티장은\n혜택도 있어요',
    description:
      '파티장에게는 수수료 할인과\n수령 후 재배송을 위한 포장 용품 제공 등\n다양한 서비스를 지원해요',
  },
];

// 세션 스토리지에 튜토리얼 완료 상태 저장
const saveTutorialCompletion = () => {
  try {
    sessionStorage.setItem('tutorialCompleted', 'true');
  } catch (error) {
    console.error('Failed to save tutorial completion status:', error);
  }
};

// 세션 스토리지에서 튜토리얼 완료 상태 확인
const isTutorialCompleted = () =>
  sessionStorage.getItem('tutorialCompleted') === 'true';

// 슬라이드 변경 시 상태 업데이트 훅
const useSlideChangeEffect = (
  swiperRef: React.RefObject<SwiperType>,
  setShowStartButton: React.Dispatch<React.SetStateAction<boolean>>,
  setShowSkipButton: React.Dispatch<React.SetStateAction<boolean>>,
  setShowPagination: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleSlideChange = useCallback(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const firstSlide = swiper.activeIndex === 0;
      const lastSlide = swiper.activeIndex === swiper.slides.length - 1;

      setShowStartButton(lastSlide);
      setShowSkipButton(!lastSlide && !firstSlide);
      setShowPagination(!lastSlide);
    }
  }, [swiperRef, setShowStartButton, setShowSkipButton, setShowPagination]);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    swiperInstance?.on('slideChange', handleSlideChange);

    return () => {
      swiperInstance?.off('slideChange', handleSlideChange);
    };
  }, [swiperRef, handleSlideChange]);
};

// 튜토리얼 슬라이드 컴포넌트
const TutorialSlide: React.FC<{
  image: string;
  alt: string;
  title: string;
  description: string;
  textColor?: string;
}> = ({ image, alt, title, description, textColor = 'text-black' }) => (
  <div className="relative">
    <h1
      className={`absolute left-[22px] top-[93px] font-h1 text-[length:var(--h1-font-size)] font-[number:var(--h1-font-weight)] leading-[var(--h1-line-height)] ${textColor}`}
    >
      {title}
    </h1>
    <p
      className={`absolute left-[21px] top-[189px] w-[254px] font-sub-2 text-[length:var(--sub-2-font-size)] font-[number:var(--sub-2-font-weight)] leading-[var(--sub-2-line-height)] ${textColor}`}
    >
      {description}
    </p>
    <img src={image} alt={alt} className="h-[776px] w-full object-cover" />
  </div>
);

const Tutorial = () => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [showPagination, setShowPagination] = useState(true);

  useEffect(() => {
    if (isTutorialCompleted()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useSlideChangeEffect(
    swiperRef,
    setShowStartButton,
    setShowSkipButton,
    setShowPagination
  );

  const handleCompleteTutorial = useCallback(() => {
    saveTutorialCompletion();
    navigate('/');
  }, [navigate]);

  return (
    <div className="relative flex justify-center">
      {showSkipButton && (
        <button
          type="button"
          onClick={handleCompleteTutorial}
          className="absolute right-4 top-6 z-10 cursor-pointer px-4 py-2 text-sm text-black"
        >
          건너뛰기
        </button>
      )}
      <Swiper
        keyboard={{ enabled: true }}
        ref={swiperRef}
        pagination={showPagination ? { clickable: true } : false}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
      >
        {TUTORIAL_SLIDES.map((slide, index) => (
          <SwiperSlide key={index}>
            <TutorialSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      {showStartButton && (
        <div className="absolute bottom-5 z-20 w-[21rem]">
          <Button
            buttonContent="시작하기"
            isActive={true}
            onClick={handleCompleteTutorial}
            type={'button'}
          />
        </div>
      )}
    </div>
  );
};

export default Tutorial;
