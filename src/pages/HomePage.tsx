import { useEffect, useState } from 'react';

import SelectCountryButton from '@/components/Buttons/SelectCountryButton';
import PartyLeader from '@/components/Lists/PartyLeader';
import Article from '@/components/Lists/Article';
import GoSearch from '@/components/SearchBar/GoSearch';
import NameCard from '@/components/NameCard/NameCard';
import getTipRandom from '@/api/getTipRandom';
import PostingRandom from '@/components/PostingCard/PostingRandom';
import MagazineList from '@/components/Magazine/MagazineList';

const HomePage = () => {
  const [randomTip, setRandomTip] = useState<any>(null);
  const [randomPosting, setRandomPosting] = useState<any>(null);

  useEffect(() => {
    const fetchRandomTip = async () => {
      try {
        const tip = await getTipRandom();
        setRandomTip(tip);
      } catch (error) {
        console.error('Failed to fetch random tip:', error);
      }
    };

    fetchRandomTip();
  }, []);

  return (
    <div className="space-y-[12px] px-3">
      <GoSearch />
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          매거진
        </h1>

        <MagazineList />
      </section>
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          국가 리스트
        </h1>
        <div className="flex flex-wrap justify-between gap-[10px_0px]">
          <SelectCountryButton
            buttonContent={'미국'}
            imgAlt={''}
            pageUrl={'미국'}
          />
          <SelectCountryButton
            buttonContent={'중국'}
            imgAlt={''}
            pageUrl={'중국'}
          />
          <SelectCountryButton
            buttonContent={'일본'}
            imgAlt={''}
            pageUrl={'일본'}
          />
          <SelectCountryButton
            buttonContent={'그 외 국가'}
            imgAlt={''}
            pageUrl={'nowwedeveloping'}
          />
        </div>
      </section>
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          이달의 우수 파티장
        </h1>
        {/* 평점 4,5에 해당하는 유저 > 스와이퍼로 보여주기 */}
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
        {/* 평점 4,5에 해당하는 유저 > 현재 모집중인 파티 3개 스와이퍼 */}
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
          <PostingRandom />
        </div>
      </section>
      <section>
        <h1 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          유저들의 팁
        </h1>
        <div>
          {randomTip ? (
            <Article
              type={randomTip.type}
              content_title={randomTip.title}
              content_img={randomTip.photo}
              subtitle={randomTip.content}
              profile_photo={randomTip.author_photo}
              nickname={randomTip.author_nickname}
              id={randomTip.id}
            />
          ) : (
            ''
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
