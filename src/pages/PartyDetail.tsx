import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import useFetch from '@/hooks/useFetch';
import PartyLeader from '@/components/Lists/PartyLeader';
import PartyInfoList from '@/components/PartyInfo/PartyInfoList';
import Button from '@/components/Buttons/Button';
import PostingCard from '@/components/PostingCard/PostingCard';
import Standard from '@/components/Lists/Standard';
import Shipstate from '@/components/shipstate/Shipstate';

interface UserData {
  id: string;
  [key: string]: any; // To account for additional user data fields
}

const PartyDetail = () => {
  const [partyLeaderData, setPartyLeaderData] = useState<UserData | null>(null);
  const [loginUserId, setLoginUserId] = useState<string>('');
  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>();

  const {
    status: partyStatus,
    data: partyData,
    error: partyErr,
  } = useFetch(
    `${import.meta.env.VITE_PB_URL}api/collections/party/records/${partyId}`
  );

  // Fetch party leader data
  useEffect(() => {
    const fetchPartyLeader = async (): Promise<void> => {
      if (partyStatus === 'success' && partyData) {
        try {
          const response = await axios.get<AxiosResponse>(
            `${import.meta.env.VITE_PB_URL}api/collections/users/records/${partyData.party_leader}`
          );
          setPartyLeaderData(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchPartyLeader();
  }, [partyData, partyStatus]);

  useEffect(() => {
    const getAuthData = () => {
      const id = localStorage.getItem('authId');
      setLoginUserId(id);
    };
    getAuthData();
  }, []);

  const handleClickJoinPartyBtn = () => {
    navigate('/home/JoinParty', { state: { partyId } });
  };

  return (
    <section>
      <h1 className="sr-only">파티 상세 페이지</h1>

      {partyStatus === 'success' && partyLeaderData && (
        <>
          <article className="flex flex-col gap-y-3.5">
            <h2 className="mt-4 text-heading-1">파티 리더 프로필</h2>
            <PartyLeader item={partyLeaderData} />
          </article>

          {/* Party Information Section */}
          <article className="flex flex-col gap-y-3.5">
            <h2 className="mt-4 text-heading-1">공구 정보</h2>
            <PartyInfoList
              country={partyData.country}
              customs_limit={partyData.target_members}
              dutiesLimit={partyData.dutiesLimit || '0'}
              weight={partyData.weight}
              current_members={String(partyData.member_ids.length) || '0'}
            />
          </article>

          {partyData.party_status === 'completed' && (
            <article>
              <h2 className="mt-4 text-heading-1">배송 진행 상황</h2>
              <Shipstate step={1} />
            </article>
          )}

          <div
            aria-label="버튼 영역"
            role="group"
            className="my-4 flex flex-row gap-x-3.5"
          >
            {partyLeaderData.id === loginUserId && (
              <Button
                type="button"
                isActive
                onClick={() => navigate('/home/chatHome')}
                buttonContent="파티 리더와 채팅"
              />
            )}
            <Button
              type="button"
              isActive
              onClick={handleClickJoinPartyBtn}
              buttonContent="파티 참여하기"
            />
          </div>

          <article className="flex flex-col gap-y-3.5">
            <h2 className="mt-4 text-heading-1">
              파티원들은 이런 물품을 구매했어요
            </h2>
            <PostingCard
              profileImg={}
              user={}
              postingImg={}
              content={}
              label={}
              data={}
            />
          </article>

          <article className="flex flex-col gap-y-3.5">
            <h2 className="mt-4 text-heading-1">반드시 읽어주세요!</h2>
            <Standard
              title="세관 공지"
              description={`관세한도까지 ${partyData.customs_limit}% 달성 시 추가 관세 발생합니다.`}
            />
          </article>
        </>
      )}
    </section>
  );
};

export default PartyDetail;
