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

// 파티 데이터 받기
// 파티 리더 데이터 받기
// 파티원 데이터 받아서 구매한 물품 렌더링하기
// 현재 유저 데이터 받아오기
const userId = {
  participating_party: [4785698425, 4785698545],
};

const partyInfo = {
  _id: 4785698425,
  party_status: 'completed',
};

// const partyData = {
//   country: '일본',
//   customs_limit: '10',
//   current_members: ['주비', '재명', '소현', '진'],
//   // 관세 한도 달성률
//   dutiesLimit: '80',
//   // 무게 한도
//   weight: '5',
// };

const PartyDetail = () => {
  const [partyLeaderData, setPartyLeaderData] = useState<AxiosResponse | null>(
    null
  );
  const navigate = useNavigate();
  const { partyId } = useParams();

  const {
    status: partyStatus,
    data: partyData,
    error: partyErr,
  } = useFetch(
    `https://hexagon-potatoes.pockethost.io/api/collections/party/records/${partyId}`
  );

  useEffect(() => {
    const fetchPartyLeader = async (): Promise<void> => {
      if (partyStatus === 'success') {
        try {
          const response = await axios.get(
            `https://hexagon-potatoes.pockethost.io/api/collections/users/records/${partyData.party_leader}`
          );
          setPartyLeaderData(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchPartyLeader();
  }, [partyData]);

  console.log(partyLeaderData);

  useEffect(() => {
    const getAuthData = async () => {
      try {
        console.log(localStorage.getItem('authToken'));
        console.log(localStorage.getItem('authId'));
      } catch (error) {
        console.log(error);
      }
    };
    getAuthData();
  }, [partyData]);

  const handleClickJoinPartyBtn = () => {
    // 파티 참여 확인 팝업 뜨기
  };

  return (
    // 전체 flex 후 gap-y-3.5 주는게 좋을 거 같음
    <section>
      <h1 className="sr-only">파티 상세 페이지</h1>
      {partyStatus === 'success' && partyLeaderData && (
        <>
          <article className="flex flex-col gap-y-3.5">
            <h2 className="mt-4 text-heading-1">파티 리더 프로필</h2>
            <PartyLeader item={partyLeaderData} />
          </article>

          <article className="flex flex-col gap-y-3.5">
            <h2 className="mt-4 text-heading-1">공구 정보</h2>
            <PartyInfoList
              country={partyData.country}
              customs_limit={partyData.customs_limit}
              dutiesLimit={partyData.dutiesLimit}
              weight={partyData.weight}
              current_members={String(partyData.member_id ?? length) || '0'}
            />
          </article>

          {partyInfo.party_status === 'completed' && (
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
            {/* {partyLeaderData.id ===  && (
              <Button
                type="button"
                isActive
                onClick={() => navigate('/home/chatHome')}
                buttonContent="파티 리더와 채팅"
              />
            )} */}
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
            <PostingCard />
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
