import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PartyLeader from './PartyLeader';
import pb from '@/utils/pocketbase';
import getRandomItems from '@/utils/getRandomItems';
import getPbImageURL from '@/utils/getPbImageURL';

interface PropTypes {
  reloadCount: number;
}

const baseUrl = `${pb.baseUrl}api/collections/users/records`;
const partyBaseUrl = `${pb.baseUrl}api/collections/party/records`;

const BestPartyLeader = ({ reloadCount }: PropTypes) => {
  const [bestUser, setBestUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestUsersAndParties = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(baseUrl, {
          params: { filter: 'rating=4 || rating=5' },
        });

        const users = response.data.items;

        if (users.length === 0) {
          throw new Error('우수 평점을 가진 유저가 없습니다.');
        }

        const partyPromises = users.map((user) =>
          axios.get(partyBaseUrl, {
            params: { filter: `party_leader="${user.id}"` },
          })
        );

        const partyResponses = await Promise.all(partyPromises);
        const usersWithParties = users.map((user, index) => ({
          ...user,
          partyCount: partyResponses[index].data.items.length,
        }));

        const validUsers = usersWithParties.filter(
          (user) => user.partyCount > 0
        );

        if (validUsers.length === 0) {
          throw new Error('유효한 파티가 있는 유저가 없습니다.');
        }

        // 랜덤하게 1명의 유저 선택
        const randomUsers = getRandomItems(validUsers, 1);
        const selectedUser = randomUsers[0];

        const profilePhotoUrl = getPbImageURL(
          pb.baseUrl,
          selectedUser,
          'profile_photo'
        );

        setBestUser({ ...selectedUser, profile_photo: profilePhotoUrl });
      } catch (err) {
        console.error('유저 정보를 가져오는 데 실패했습니다:', err);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBestUsersAndParties();
  }, [reloadCount]);

  if (loading) return <p aria-live="polite">로딩 중...</p>;
  if (error) return <p aria-live="assertive">{error}</p>;

  return (
    <div>
      {bestUser ? (
        <PartyLeader
          profile_photo={bestUser.profile_photo}
          nickname={bestUser.nickname}
          rating={bestUser.rating}
          user_id={bestUser.id}
          gradeImg={bestUser.gradeImg}
          party_number={bestUser.partyCount}
          member_description={bestUser.user_desc}
        />
      ) : (
        <p>우수 파티장 정보를 불러오는 데 실패했습니다.</p>
      )}
    </div>
  );
};

export default BestPartyLeader;
