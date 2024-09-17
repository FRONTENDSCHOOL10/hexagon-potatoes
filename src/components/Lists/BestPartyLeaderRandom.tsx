import React, { useEffect, useState } from 'react';
import getBestUserRandom from '@/api/getBestUserRandom';
import PartyLeader from './PartyLeader';

const BestPartyLeader = () => {
  const [bestUser, setBestUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestUser = async () => {
      try {
        const user = await getBestUserRandom();
        setBestUser(user);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch best user:', err);
        setError('데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchBestUser();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {bestUser ? (
        <PartyLeader
          key={bestUser.id}
          profile_photo={bestUser.profile_photo} // 기본 프로필 이미지 사용
          nickname={bestUser.nickname}
          rating={bestUser.rating}
          user_id={bestUser.id}
          gradeImg={bestUser.gradeImg}
          party_number={bestUser.party_number}
          // 필요에 따라 member_grade와 member_description 추가
        />
      ) : (
        <p>우수 파티장 정보를 불러오는 데 실패했습니다.</p>
      )}
    </div>
  );
};

export default BestPartyLeader;
