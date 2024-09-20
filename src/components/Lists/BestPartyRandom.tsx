import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NameCard from '@/components/NameCard/NameCard';
import pb from '@/utils/pocketbase';
import PartyLeader from './PartyLeader';
import getPbImageURL from '@/utils/getPbImageURL';

const partyBaseUrl = `${pb.baseUrl}api/collections/party/records`;
const url = 'https://hexagon-potatoes.pockethost.io';

interface User {
  id: string;
  profile_photo?: string;
  nickname: string;
  rating: number;
  gradeImg: string;
  partyCount: number;
  user_desc: string;
}

interface Party {
  id: string;
  party_name: string;
  party_about: string;
  country: string;
  party_leader: string;
  expand?: {
    party_leader: User;
  };
}

interface BestPartyRandomProps {
  type?: 'party' | 'user';
}

// 이달의 우수 파티장 => 현재 파티를 진행하고 있는 파티리더중 별점이 4점 이상인 리더
// 추천 파티 리스트 => 파티리더중 별점이 4점이상인 리더가 현재 진행중인 파티
// 이렇게 이해하고 데이터 요청은 한번이면 되지않을까 하고 두번이였던 api 요청을 한번으로 줄이고
// 로직이 비슷해 보이는 BestPartyLeaderRandom을 사용하는 대신
// BestPartyRandom 한컴포넌트 안에서 type만 다르게 줘서 처리하게 했습니다

const BestPartyRandom: React.FC<BestPartyRandomProps> = ({ type = 'user' }) => {
  const [randomParty, setRandomParty] = useState<Party | null>(null);
  const [randomBestLeader, setRandomBestLeader] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController를 사용하여 컴포넌트 언마운트 시 진행 중인 요청을 취소 메모리 누수 방지
    // StrictMode의 이중 렌더링으로 인해 발생할 수 있는 메모리 누수를 AbortController가 효과적으로 방지
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRandomPartyAndLeader = async () => {
      // 기존의 코드는 리더 콜렉션에서 레이팅 4,5인 유저 데이터 요청 => 받은 유저 id로 파티 콜렉션에서 한번더 데이터 조회 및 요청
      // 파티 콜렉션에서 expand로 party_leader를 하고 filter로 "party_leader.rating>=4" 를 해서 한번의 데이터 요청으로 줄임
      // 결론 : 파티 리더의 별점이 4이상인 리더의 파티를 요청
      try {
        const response = await axios.get(partyBaseUrl, {
          params: {
            filter: 'party_leader.rating>=4',
            expand: 'party_leader',
          },
          signal: signal,
        });

        const parties = response.data.items;

        if (parties.length === 0) {
          throw new Error('우수 평점을 가진 파티가 없습니다.');
        }

        // 랜덤한 숫자를 만듦
        // 한 컴포넌트에서 처리하기 때문에 파티 랜덤넘버, 리더 랜덤넘버 구분
        const partyNum = Math.floor(Math.random() * parties.length);
        const leaderNum = Math.floor(Math.random() * parties.length);

        // 조회한 파티 데이터에 랜덤한 숫자로 랜덤파티 상태 업데이트
        setRandomParty(parties[partyNum]);
        // 조회한 파티 데이터에 랜덤한 숫자로 랜덤파티 가져와서 expand한 파티리더 정보로 랜덤베스트리더 상태 업데이트
        setRandomBestLeader(parties[leaderNum].expand?.party_leader || null);

        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          console.error('파티 정보를 가져오는 데 실패했습니다:', err);
          setError('데이터를 가져오는 데 실패했습니다.');
        }
        setLoading(false);
      }
    };

    fetchRandomPartyAndLeader();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const countryImg = (country: string) => {
    switch (country) {
      case '미국':
        return '/assets/country/american-flag.webp';
      case '중국':
        return '/assets/country/china-flag.webp';
      case '일본':
        return '/assets/country/japan-flag.webp';
      default:
        return '/assets/shipmatelogo.png';
    }
  };

  const partyCountryImg = randomParty ? countryImg(randomParty.country) : null;

  return type === 'party' ? (
    <div>
      {randomParty ? (
        <NameCard
          name={randomParty.party_name}
          profileImg={
            partyCountryImg ||
            randomParty.expand?.party_leader.profile_photo ||
            null
          }
          type="viewParty"
          id={randomParty.id}
          subtext={randomParty.party_about}
        />
      ) : (
        <p>파티 정보를 불러오는 데 실패했습니다.</p>
      )}
    </div>
  ) : (
    <div>
      {randomBestLeader ? (
        <PartyLeader
          key={randomBestLeader.id}
          profile_photo={getPbImageURL(url, randomBestLeader, 'profile_photo')}
          nickname={randomBestLeader.nickname}
          rating={randomBestLeader.rating}
          user_id={randomBestLeader.id}
          gradeImg={randomBestLeader.gradeImg}
          party_number={randomBestLeader.partyCount}
          member_description={randomBestLeader.user_desc}
        />
      ) : (
        <p>우수 파티장 정보를 불러오는 데 실패했습니다.</p>
      )}
    </div>
  );
};

export default BestPartyRandom;
