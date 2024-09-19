import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import axios from 'axios';
import StandardInput from '@/components/Inputs/StandardInput';
import Button from '@/components/Buttons/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import { countries } from '@/components/Dropdown/DropdownList';

const partyData = {
  party_name: '',
  party_about: '',
  party_notice: '',
  personal_code: '',
  target_members: '',
  weight: '',
  country: '',
  participation_deadline: '',
};

const PartyCollect = () => {
  const [data, setData] = useState(partyData);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const checkInputFilled = (data: typeof data) => {
    // 모든 인풋이 채워져 있는지 확인
    const isFilled = Object.values(data).every(
      (d) => d !== undefined && d !== null && d !== ''
    );
    setIsActive(isFilled);
  };

  const handleChangeInput = (inputName: string) => (value: string | number) => {
    // 데이터 받아와서 업데이트
    const updatedData = { ...data, [inputName]: value };
    setData(updatedData);
    checkInputFilled(updatedData);
  };

  // 보낼 데이터 만들기
  const createFormData = () => {
    const formData = new FormData();
    formData.append('party_name', data.party_name);
    formData.append('country', data.country);
    formData.append('participation_deadline', data.participation_deadline);
    formData.append('party_about', data.party_about);
    formData.append('party_notice', data.party_notice);
    formData.append('personal_code', data.personal_code);
    formData.append('target_members', data.target_members);
    formData.append('weight', data.weight);

    return formData;
  };

  const fetchData = async () => {
    const formData = await createFormData();
    try {
      await axios.post(
        'https://hexagon-potatoes.pockethost.io/api/collections/party/records',
        formData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickNextBtn = async () => {
    // 모든 인풋이 채워졌는지 확인
    fetchData();
    navigate('/home/JoinParty');
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
        list={countries}
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
