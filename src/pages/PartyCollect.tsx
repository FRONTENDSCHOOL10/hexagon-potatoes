import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StandardInput from '@/components/Inputs/StandardInput';
import Button from '@/components/Buttons/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import { categories } from '@/components/Dropdown/DropdownList';

const partyData = {
  party_name: '',
  party_about: '',
  party_notice: '',
  personal_code: '',
  target_members: '',
  weight: '',
  country: '',
  size: '',
  participation_deadline: '',
};

const PartyCollect = () => {
  const [formData, setFormData] = useState(partyData);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const handleClickNextBtn = () => {
    // 모든 인풋이 채워졌는지 확인
    navigate('/home/JoinParty');
  };

  const checkInputFilled = (data: typeof formData) => {
    // 모든 인풋이 채워져 있는지 확인
    const isFilled = Object.values(data).every(
      (d) => d !== undefined && d !== null && d !== ''
    );
    setIsActive(isFilled);
  };

  const handleChangeInput = (inputName: string) => (value: string | number) => {
    // 데이터 받아와서 업데이트
    const updatedData = { ...formData, [inputName]: value };
    setFormData(updatedData);
    checkInputFilled(updatedData);
  };

  return (
    <section className="flex flex-col gap-y-3">
      <h1>파티 모집 페이지</h1>
      <StandardInput
        type="text"
        inputLabel="파티 이름"
        placeholder="파티 이름"
        inputName="party_name"
        onInputChange={handleChangeInput}
      />
      <StandardInput
        type="text"
        inputLabel="파티 소개"
        inputName="party_about"
        placeholder="파티 소개"
        onInputChange={handleChangeInput}
      />
      <StandardInput
        type="text"
        inputLabel="공지사항"
        inputName="party_notice"
        onInputChange={handleChangeInput}
        placeholder="공지 사항을 입력해 주세요"
      />
      <StandardInput
        type="number"
        inputLabel="개인통관고유부호"
        inputName="personal_code"
        onInputChange={handleChangeInput}
        placeholder="개인통관고유부호"
      />
      <Dropdown
        list={categories}
        label="직구할 국가"
        dropdownName="country"
        onInputChange={handleChangeInput}
        defaultMsg="직구할 국가를 선택해 주세요"
      />

      <StandardInput
        type="number"
        inputLabel="모집 인원"
        inputName="target_members"
        onInputChange={handleChangeInput}
        placeholder="모집 인원"
      />
      <StandardInput
        type="number"
        inputLabel="무게 입력"
        inputName="weight"
        onInputChange={handleChangeInput}
        placeholder="물건 당 최대 무게 (kg)"
      />
      <StandardInput
        type="date"
        inputLabel="참여 마감일"
        inputName="participation_deadline"
        onInputChange={handleChangeInput}
        placeholder="참여 마감일"
      />
      <Button
        type="button"
        buttonContent="다음으로"
        isActive={isActive}
        onClick={handleClickNextBtn}
      />
    </section>
  );
};

export default PartyCollect;
