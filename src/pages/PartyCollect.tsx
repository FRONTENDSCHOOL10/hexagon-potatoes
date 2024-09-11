import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StandardInput from '@/components/Inputs/StandardInput';
import Button from '@/components/Buttons/Button';

const PartyCollect = () => {
  const [isActive, setIsActive] = useState();
  const navigate = useNavigate();
  const handleClickNextBtn = () => {
    // 모든 인풋이 채워졌는지 확인
    navigate('/home/JoinParty');
  };

  return (
    <section className="flex flex-col gap-y-3">
      <h1>파티 모집 페이지</h1>
      <StandardInput inputLabel="파티 이름" placeholder="파티 이름" />
      <StandardInput inputLabel="파티 소개" placeholder="파티 소개" />
      <StandardInput
        inputLabel="공지사항"
        placeholder="공지 사항을 입력해 주세요"
      />
      <StandardInput
        inputLabel="개인통관고유부호"
        placeholder="개인통관고유부호"
      />
      {/* 드롭다운 만들어서 변경 */}
      <StandardInput inputLabel="직구할 국가" placeholder="직구할 국가" />

      <StandardInput inputLabel="모집 인원" placeholder="모집 인원" />
      <StandardInput
        inputLabel="무게 입력"
        placeholder="물건 당 최대 무게 (kg)"
      />
      <StandardInput inputLabel="참여 마감일" placeholder="참여 마감일 " />
      <Button buttonContent="다음으로" isActive onClick={handleClickNextBtn} />
    </section>
  );
};

export default PartyCollect;
