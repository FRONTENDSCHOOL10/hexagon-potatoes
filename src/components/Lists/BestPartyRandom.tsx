import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NameCard from '@/components/NameCard/NameCard';
import pb from '@/utils/pocketbase';

const baseUrl = `${pb.baseUrl}/api/collections/users/records`;
const partyBaseUrl = `${pb.baseUrl}/api/collections/party/records`;

const BestPartyRandom = () => {
  const [randomUser, setRandomUser] = useState<any>(null);
  const [randomParty, setRandomParty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomUserWithParty = async () => {
      try {
        const response = await axios.get(baseUrl, {
          params: {
            filter: 'rating=4 || rating=5',
          },
        });

        const users = response.data.items;

        if (users.length === 0) {
          throw new Error('우수 평점을 가진 유저가 없습니다.');
        }

        const partyPromises = users.map((user) =>
          axios.get(partyBaseUrl, {
            params: {
              filter: `party_leader="${user.id}"`, // 유저 ID로 파티 필터링
            },
          })
        );

        const partyResponses = await Promise.all(partyPromises);
        const usersWithParties = users.map((user, index) => ({
          ...user,
          parties: partyResponses[index].data.items,
        }));

        const validUsers = usersWithParties.filter(
          (user) => user.parties.length > 0
        );
        if (validUsers.length === 0) {
          throw new Error('유효한 파티가 있는 유저가 없습니다.');
        }

        // 랜덤 유저 선택
        const randomIndex = Math.floor(Math.random() * validUsers.length);
        const selectedUser = validUsers[randomIndex];

        // 랜덤 파티 선택
        const partyRandomIndex = Math.floor(
          Math.random() * selectedUser.parties.length
        );
        const selectedParty = selectedUser.parties[partyRandomIndex];

        setRandomUser(selectedUser);
        setRandomParty(selectedParty);
        setLoading(false);
      } catch (err) {
        console.error('유저 또는 파티 정보를 가져오는 데 실패했습니다:', err);
        setError('데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchRandomUserWithParty();
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

  const partyCountryImg = countryImg(randomParty.country);

  return (
    <div>
      {randomUser && randomParty ? (
        <NameCard
          name={randomParty.party_name}
          profileImg={partyCountryImg || randomUser.profile_photo || null}
          type="viewParty"
          id={randomParty.id}
          subtext={randomParty.party_about}
        />
      ) : (
        <p>파티 정보를 불러오는 데 실패했습니다.</p>
      )}
    </div>
  );
};

export default BestPartyRandom;
