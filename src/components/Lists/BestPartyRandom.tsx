import React, { useEffect, useState } from 'react';
import NameCard from '@/components/NameCard/NameCard';
import getBestUserRandom from '@/api/getBestUserRandom';
import getPartyByUserId from '@/api/getPartyByUserId';

// 국가에 따른 이미지 경로를 반환하는 함수
const countryImg = (country: string) => {
  switch (country) {
    case '미국':
      return '/assets/country/american-flag.png';
    case '중국':
      return '/assets/country/china-flag.png';
    case '일본':
      return '/assets/country/japan-flag.png';
    default:
      return '/assets/shipmatelogo.png';
  }
};

const BestPartyRandom = () => {
  const [randomUser, setRandomUser] = useState<any>(null);
  const [randomParty, setRandomParty] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 유저 정보 가져오기
        const user = await getBestUserRandom();
        setRandomUser(user);

        // 유저의 파티 정보 가져오기
        const partyRecords = await getPartyByUserId(user.id);
        if (partyRecords.length > 0) {
          // 랜덤으로 하나의 파티 선택
          const randomIndex = Math.floor(Math.random() * partyRecords.length);
          const selectedParty = partyRecords[randomIndex];
          setRandomParty(selectedParty);
        }
      } catch (error) {
        console.error('Error fetching random user or party:', error);
      }
    };

    fetchData();
  }, []);

  if (!randomUser || !randomParty) {
    return <div>로딩 중...</div>;
  }

  // 파티 정보에 따른 국가 이미지 경로
  const partyCountryImg = countryImg(randomParty.country);

  return (
    <div>
      <NameCard
        name={randomParty.party_name} // 파티의 이름
        profileImg={partyCountryImg || randomUser.profileImg || null} // 국가 이미지 또는 유저의 프로필 이미지
        type="viewParty" // 타입 설정
        id={randomParty.id} // 선택된 파티의 ID 전달
        subtext={randomParty.party_about} // 파티의 설명을 서브텍스트로 설정
      />
    </div>
  );
};

export default BestPartyRandom;
