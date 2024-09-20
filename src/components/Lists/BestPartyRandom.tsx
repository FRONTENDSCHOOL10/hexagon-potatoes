import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import NameCard from '@/components/NameCard/NameCard';
import pb from '@/utils/pocketbase';
import PartyLeader from './PartyLeader';
import getPbImageURL from '@/utils/getPbImageURL';

const partyBaseUrl = `${pb.baseUrl}api/collections/party/records`;
const url = `${pb.baseUrl}`;

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

interface RandomBestLeader {
  leaderData: User;
  partyData: Party[];
}

interface PropTypes {
  type?: 'party' | 'user';
  reloadCount: number;
}

// 이달의 우수 파티장 => 현재 파티를 진행하고 있는 파티리더중 별점이 4점 이상인 리더
// 추천 파티 리스트 => 파티리더중 별점이 4점이상인 리더가 현재 진행중인 파티
// 이렇게 이해하고 데이터 요청은 한번이면 되지않을까 하고 두번이였던 api 요청을 한번으로 줄이고
// 로직이 비슷해 보이는 BestPartyLeaderRandom을 사용하는 대신
// BestPartyRandom 한컴포넌트 안에서 type만 다르게 줘서 처리하게 했습니다

const BestPartyRandom = React.memo(
  ({ type = 'user', reloadCount }: PropTypes) => {
    const [randomParty, setRandomParty] = useState<Party | null>(null);
    const [randomBestLeader, setRandomBestLeader] =
      useState<RandomBestLeader | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRandomPartyAndLeader = useCallback(async () => {
      // AbortController를 사용하여 컴포넌트 언마운트 시 진행 중인 요청을 취소
      // 메모리 누수 방지
      const controller = new AbortController();
      const signal = controller.signal;

      setError(null);
      setLoading(true);

      try {
        // 파티 콜렉션에서 별점 4 이상인 리더의 파티 데이터를 요청
        const response = await axios.get<{ items: Party[] }>(partyBaseUrl, {
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
        const partyNum = Math.floor(Math.random() * parties.length);
        const leaderNum = Math.floor(Math.random() * parties.length);

        // 랜덤으로 구한 "parties[leaderNum].party_leader" 파티리더와 일치하는 파티 필터링
        const newArray = parties.filter(
          (party) => party.party_leader === parties[leaderNum].party_leader
        );

        if (type === 'party') {
          // 랜덤 파티 상태 업데이트
          setRandomParty(parties[partyNum]);
        } else {
          // 랜덤 파티와 관련된 리더 정보 업데이트
          setRandomBestLeader({
            leaderData: parties[leaderNum].expand!.party_leader,
            partyData: newArray,
          });
        }

        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          console.error('파티 정보를 가져오는 데 실패했습니다:', err);
          setError('데이터를 가져오는 데 실패했습니다.');
        }
      } finally {
        setLoading(false);
      }

      return () => {
        controller.abort();
      };
    }, [type]);

    useEffect(() => {
      fetchRandomPartyAndLeader();
    }, [fetchRandomPartyAndLeader, reloadCount]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    const countryImg = (country: string): string => {
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

    const partyCountryImg = randomParty
      ? countryImg(randomParty.country)
      : null;

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
            key={randomBestLeader.leaderData.id}
            profile_photo={getPbImageURL(
              url,
              randomBestLeader.leaderData,
              'profile_photo'
            )}
            nickname={randomBestLeader.leaderData.nickname}
            rating={randomBestLeader.leaderData.rating}
            user_id={randomBestLeader.leaderData.id}
            gradeImg={randomBestLeader.leaderData.gradeImg}
            party_number={randomBestLeader.partyData.length}
            member_description={randomBestLeader.leaderData.user_desc}
          />
        ) : (
          <p>우수 파티장 정보를 불러오는 데 실패했습니다.</p>
        )}
      </div>
    );
  }
);

export default BestPartyRandom;
