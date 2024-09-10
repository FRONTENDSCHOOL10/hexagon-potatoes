import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; // Ensure you import pagination CSS

import MiniPostingCard from '@/components/PostingCard/MiniPostingCard';
import SelectCountryButton from '../components/Buttons/SelectCountryButton';
import PartyLeaderList from '../components/Lists/ParyLeaderList';
import PartyLeader from '../components/Lists/PartyLeader';
import PostingCard from '../components/PostingCard/PostingCard';
import Article from '@/components/Lists/Article';
import GoSearch from '../components/SearchBar/GoSearch';
import NameCard from '@/components/NameCard/NameCard';

const HomePage = () => {
  return (
    <div className="space-y-[12px] px-3">
      <GoSearch />
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          매거진
        </h1>
        {/* 매거진 관련 내용 */}
        <Swiper
          className="mySwiper"
          modules={[Navigation]}
          slidesPerView={3}
          loop
          spaceBetween={160}
          centeredSlides={true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <MiniPostingCard
              nickname={'매거진1'}
              content={'매거진1'}
              id={''}
              photo={'/assets/shipmatelogo.png'}
            />
          </SwiperSlide>
          <SwiperSlide>
            <MiniPostingCard
              nickname={'매거진2'}
              content={'매거진2'}
              id={''}
              photo={'/assets/shipmatelogo.png'}
            />
          </SwiperSlide>
          <SwiperSlide>
            <MiniPostingCard
              nickname={'매거진3'}
              content={'매거진3'}
              id={''}
              photo={'/assets/shipmatelogo.png'}
            />
          </SwiperSlide>
          <SwiperSlide>
            <MiniPostingCard
              nickname={'매거진4'}
              content={'매거진'}
              id={''}
              photo={'/assets/shipmatelogo.png'}
            />
          </SwiperSlide>
        </Swiper>
      </section>
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          국가 리스트
        </h1>
        <div className="flex flex-wrap justify-between gap-[10px_0px]">
          <SelectCountryButton
            buttonContent={'미국'}
            imgAlt={''}
            pageUrl={''}
            imgSrc={'shipmatelogo.png'}
          />
          <SelectCountryButton
            buttonContent={'중국'}
            imgAlt={''}
            pageUrl={''}
            imgSrc={'shipmatelogo.png'}
          />
          <SelectCountryButton
            buttonContent={'일본'}
            imgAlt={''}
            pageUrl={''}
            imgSrc={'shipmatelogo.png'}
          />
          <SelectCountryButton
            buttonContent={'그 외 국가'}
            imgAlt={''}
            pageUrl={''}
            imgSrc={'shipmatelogo.png'}
          />
        </div>
      </section>
      <section>
        {/* 우수 파티장 별점 높은 애들 중 랜덤으로 한명만 보이게 할까 */}
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          이달의 우수 파티장
        </h1>
        <PartyLeader
          gradeImg={'/assets/shipmatelogo.png'}
          profile_photo={'/assets/shipmatelogo.png'}
          nickname={'닉네임'}
          itemImgAlt={''}
          rating={'3'}
          member_grade={'골드'}
          member_description={'소개'}
          user_id={0}
        />
      </section>
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          추천 파티 리스트
        </h1>
        <NameCard
          name={'이거는 파티'}
          subtext="여긴 아마 파티 소개"
          type={'viewParty'}
        />
      </section>
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          직구 자랑
        </h1>
        <div>
          <PostingCard
            user={'유저'}
            content={'얍'}
            postingImg="/assets/shipmatelogo.png"
            profileImg="/assets/shipmatelogo.png"
          />
        </div>
      </section>
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          유저들의 팁
        </h1>
        <div>
          <Article
            party_name={''}
            partyImg={'/assets/shipmatelogo.png'}
            partyImgAlt={''}
            party_about={''}
            profile_photo={'/assets/shipmatelogo.png'}
            leaderImgAlt={''}
            nickname={''}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
