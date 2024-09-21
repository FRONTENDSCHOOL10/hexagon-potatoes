import SelectCountryButton from '@/components/Buttons/SelectCountryButton';
import GoSearch from '@/components/SearchBar/GoSearch';
import PostingRandom from '@/components/PostingCard/PostingRandom';
import MagazineList from '@/components/Magazine/MagazineList';
import BestPartyRandom from '@/components/Lists/BestPartyRandom';
import RandomTip from '@/components/Lists/RandomTip';
import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import ReloadButton from '../components/Buttons/ReloadButton';

const headStyle = ` mb-[.75rem] pt-4 font-heading-1 text-heading-1 font-medium`;
const headerSectionStyle = `flex flex-row items-center justify-between`;
const MAX_RELOADS = 5;

const HomePage = () => {
  const [reloadCounts, setReloadCounts] = useState({
    bestUser: 0,
    bestParty: 0,
    userBoast: 0,
    userTips: 0,
  });
  const handleReload = useCallback(async (id: keyof typeof reloadCounts) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setReloadCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1,
    }));
  }, []);
  return (
    <>
      <Helmet>
        <title>홈페이지 | Shipmate</title>
        <meta
          name="description"
          content="Shipmate의 홈페이지에서 해외직구와 관련해 검색, 매거진, 국가 리스트, 추천 파티 리스트 등 다양한 정보를 확인하세요."
        />
        <meta name="keywords" content="홈페이지, 홈, 직구" />
      </Helmet>
      <div className="space-y-[12px] px-3">
        <h1 className="sr-only">홈페이지</h1>
        <GoSearch />
        <section>
          <h2 className={headStyle}>매거진</h2>
          <MagazineList />
        </section>
        <section>
          <h2 className={headStyle}>국가 리스트</h2>
          <div className="flex flex-wrap justify-between gap-[10px_0px]">
            <SelectCountryButton
              buttonContent={'미국'}
              imgAlt={'미국'}
              pageUrl={'미국'}
            />
            <SelectCountryButton
              buttonContent={'중국'}
              imgAlt={'중국'}
              pageUrl={'중국'}
            />
            <SelectCountryButton
              buttonContent={'일본'}
              imgAlt={'일본'}
              pageUrl={'일본'}
            />
            <SelectCountryButton
              buttonContent={'그 외 국가'}
              imgAlt={'그 외 국가'}
              pageUrl={'nowwedeveloping'}
            />
          </div>
        </section>
        <section>
          <div className={headerSectionStyle}>
            <h2 className={headStyle}>이달의 우수 파티장</h2>
            <ReloadButton
              id={'bestUser'}
              onReload={handleReload}
              disabled={reloadCounts.bestUser >= MAX_RELOADS}
              count={reloadCounts.bestUser}
              maxCount={MAX_RELOADS}
            />
          </div>
          <BestPartyRandom reloadCount={reloadCounts.bestUser} />
        </section>
        <section>
          <div className={headerSectionStyle}>
            <h2 className={headStyle}>추천 파티 리스트</h2>
            <ReloadButton
              id={'bestParty'}
              onReload={handleReload}
              disabled={reloadCounts.bestParty >= MAX_RELOADS}
              count={reloadCounts.bestParty}
              maxCount={MAX_RELOADS}
            />
          </div>
          <BestPartyRandom
            type={'party'}
            reloadCount={reloadCounts.bestParty}
          />
        </section>
        <section>
          <div className={headerSectionStyle}>
            <h2 className={headStyle}>직구 자랑</h2>
            <ReloadButton
              id={'userBoast'}
              onReload={handleReload}
              disabled={reloadCounts.userBoast >= MAX_RELOADS}
              count={reloadCounts.userBoast}
              maxCount={MAX_RELOADS}
            />
          </div>
          <PostingRandom reloadCount={reloadCounts.userBoast} />
        </section>
        <section>
          <div className={headerSectionStyle}>
            <h2 className={headStyle}>유저들의 팁</h2>
            <ReloadButton
              id={'userTips'}
              onReload={handleReload}
              disabled={reloadCounts.userTips >= MAX_RELOADS}
              count={reloadCounts.userTips}
              maxCount={MAX_RELOADS}
            />
          </div>
          <RandomTip reloadCount={reloadCounts.userTips} />
        </section>
      </div>
    </>
  );
};

export default HomePage;
