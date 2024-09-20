import React from 'react';
import { useNavigate } from 'react-router-dom';
import PartyLeader from '@/components/Lists/PartyLeader';
import PartyInfoList from '@/components/PartyInfo/PartyInfoList';
import Button from '@/components/Buttons/Button';
import PostingCard from '@/components/PostingCard/PostingCard';
import Standard from '@/components/Lists/Standard';
import Shipstate from '@/components/shipstate/Shipstate';
import { Helmet } from 'react-helmet-async';

// 파티 데이터 받기
// 파티 리더 데이터 받기
// 파티원 데이터 받아서 구매한 물품 렌더링하기
// 현재 유저 데이터 받아오기
const userData = {
  participating_party: [4785698425, 4785698545],
};

const partyData = {
  _id: 4785698425,
  party_status: 'completed',
};

const data = {
  country: '일본',
  customs_limit: '10',
  current_members: ['주비', '재명', '소현', '진'],
  // 관세 한도 달성률
  dutiesLimit: '80',
  // 무게 한도
  weight: '5',
};

const PartyDetail = () => {
  const navigate = useNavigate();

  const handleClickJoinPartyBtn = () => {
    // 파티 참여 확인 팝업 뜨기
  };

  return (
    <>
      <Helmet>
        <title>파티 상세 페이지 | Shipmate</title>
        <meta
          name="description"
          content="파티의 리더와 정보, 배송 진행 상황 등을 확인하고 채팅이나 파티에 참여해보세요."
        />
        <meta name="keywords" content="파티, 상세 정보, 배송, 해외 직구" />
      </Helmet>
      <section>
        <h1 className="sr-only">파티 상세 페이지</h1>
        <article className="flex flex-col gap-y-3.5">
          <h2 className="mt-4 text-heading-1">파티 리더 프로필</h2>
          <PartyLeader />
        </article>

        <article className="flex flex-col gap-y-3.5">
          <h2 className="mt-4 text-heading-1">공구 정보</h2>
          <PartyInfoList
            country={data.country}
            customs_limit={data.customs_limit}
            current_members={String(data.current_members.length)}
            dutiesLimit={data.dutiesLimit}
            weight={data.weight}
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
          {userData.participating_party.includes(partyData._id) && (
            <Button
              isActive
              onClick={() => navigate('/home/chatHome')}
              buttonContent="파티 리더와 채팅"
            />
          )}
          <Button
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
            description={`관세한도까지 ${data.dutiesLimit}% 달성 시 추가 관세 발생합니다.`}
          />
        </article>
      </section>
    </>
  );
};

export default PartyDetail;
