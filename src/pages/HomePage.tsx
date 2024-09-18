import { useEffect, useState } from 'react';

import SelectCountryButton from '@/components/Buttons/SelectCountryButton';
import Article from '@/components/Lists/Article';
import GoSearch from '@/components/SearchBar/GoSearch';
import getTipRandom from '@/api/getTipRandom';
import PostingRandom from '@/components/PostingCard/PostingRandom';
import MagazineList from '@/components/Magazine/MagazineList';
import BestPartyLeader from '@/components/Lists/BestPartyLeaderRandom';
import BestPartyRandom from '../components/Lists/BestPartyRandom';

const HomePage = () => {
  const [randomTip, setRandomTip] = useState<any>(null);

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
      <h1 className="sr-only">홈페이지</h1>
      <GoSearch />
      <section>
        <h2 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          매거진
        </h2>
        <MagazineList />
      </section>
      <section>
        <h2 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          국가 리스트
        </h2>
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
        <h2 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          이달의 우수 파티장
        </h2>
        <BestPartyLeader />
      </section>
      <section>
        <h2 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          추천 파티 리스트
        </h2>
        <BestPartyRandom />
      </section>
      <section>
        <h2 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          직구 자랑
        </h2>
        <div>
          <PostingRandom />
        </div>
      </section>
      <section>
        <h2 className="mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium">
          유저들의 팁
        </h2>
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
