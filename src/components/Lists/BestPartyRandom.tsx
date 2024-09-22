import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import NameCard from '@/components/NameCard/NameCard';
import pb from '@/utils/pocketbase';
import PartyLeader from './PartyLeader';
import getPbImageURL from '@/utils/getPbImageURL';
import { Skeleton } from '@/components/LoadingSpinner';

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

const partyBaseUrl = `${pb.baseUrl}api/collections/party/records`;
const url = `${pb.baseUrl}`;

const BestPartyRandom = React.memo(
  ({ type = 'user', reloadCount }: PropTypes) => {
    const [randomParty, setRandomParty] = useState<Party | null>(null);
    const [randomBestLeader, setRandomBestLeader] =
      useState<RandomBestLeader | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchRandomPartyAndLeader = useCallback(async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      setError(null);
      setLoading(true);

      try {
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

        const partyNum = Math.floor(Math.random() * parties.length);
        const leaderNum = Math.floor(Math.random() * parties.length);

        const newArray = parties.filter(
          (party) => party.party_leader === parties[leaderNum].party_leader
        );

        if (type === 'party') {
          setRandomParty(parties[partyNum]);
        } else {
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

    if (loading) {
      return <Skeleton className="h-28 w-full" />;
    }

    if (error) {
      return <div aria-live="assertive">{error || '데이터가 없습니다.'}</div>;
    }

    const countryImg = (country: string): string => {
      switch (country) {
        case '미국':
          return '/assets/country/american-flag.webp';
        case '중국':
          return '/assets/country/china-flag.webp';
        case '일본':
          return '/assets/country/japan-flag.webp';
        default:
          return '/assets/shipmatelogo.webp';
      }
    };

    const partyCountryImg = randomParty
      ? countryImg(randomParty.country)
      : null;

    return type === 'party' ? (
      <div aria-label="추천 파티">
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
          <ul aria-label="우수 파티장 프로필">
            <PartyLeader
              item={{
                ...randomBestLeader.leaderData,
                profile_photo: getPbImageURL(
                  url,
                  randomBestLeader.leaderData,
                  'profile_photo'
                ),
                participating_party: randomBestLeader.partyData,
                itemImgAlt: '파티장 프로필',
              }}
            />
          </ul>
        ) : (
          <p>우수 파티장 정보를 불러오는 데 실패했습니다.</p>
        )}
      </div>
    );
  }
);

export default BestPartyRandom;
