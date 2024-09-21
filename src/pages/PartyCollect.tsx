import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pb from '@/utils/pocketbase';
import useFetch from '@/hooks/useFetch';
import StandardInput from '@/components/Inputs/StandardInput';
import Button from '@/components/Buttons/Button';
import Dropdown from '@/components/Dropdown/Dropdown';

import { countries } from '@/components/Dropdown/DropdownList';
import { Helmet } from 'react-helmet-async';

interface PartyData {
  party_name: string;
  party_about: string;
  party_notice: string;
  personal_code: string;
  target_members: string;
  weight: string;
  country: string;
  participation_deadline: string;
}

interface AuthUserData {
  id: string | null;
  token: string | null;
}

const initialPartyData: PartyData = {
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
  const [data, setData] = useState<PartyData>(initialPartyData);
  const [authUserData, setAuthUserData] = useState<AuthUserData>({
    id: null,
    token: null,
  });
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const id = localStorage.getItem('authId');
      const token = localStorage.getItem('authToken');
      setAuthUserData({ id, token });
    } catch (error) {
      console.error('Error fetching auth data from localStorage:', error);
    }
  }, []);

  const checkInputFilled = (updatedData: PartyData) => {
    const isFilled = Object.values(updatedData).every(
      (value) => value !== undefined && value !== null && value !== ''
    );
    setIsActive(isFilled);
  };

  const handleChangeInput = (inputName: string) => (value: string | number) => {
    const updatedData = { ...data, [inputName]: value };
    setData(updatedData);
    checkInputFilled(updatedData);
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append('party_name', data.party_name);
    formData.append('party_leader', authUserData.id || '');
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
    const formData = createFormData();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PB_URL}api/collections/party/records`,
        formData
      );
      const partyId = response.data.id;
      navigate(`/home/JoinParty`, { state: { partyId } });
    } catch (error) {
      console.error('Error creating party:', error);
    }
  };

  // Handle next button click
  const handleClickNextBtn = async () => {
    await fetchData();
  };

  return (
    <>
      <Helmet>
        <title>파티 모집 | Shipmate</title>
        <meta
          name="description"
          content="파티 모집 페이지에서 원하는 국가와 상품, 목표 인원 등 꼼꼼히 적고 함께 할 사람을 모아보세요!"
        />
        <meta
          name="keyword"
          content={`해외 직구, 직구, ${data.country}, 쇼핑, 파티, 모집, 상품`}
        />
      </Helmet>
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
          placeholder="파티 소개"
          inputName="party_about"
          onInputChange={handleChangeInput}
        />

        <StandardInput
          type="text"
          inputLabel="공지사항"
          placeholder="공지 사항을 입력해 주세요"
          inputName="party_notice"
          onInputChange={handleChangeInput}
        />

        <StandardInput
          type="number"
          inputLabel="개인통관고유부호"
          placeholder="개인통관고유부호"
          inputName="personal_code"
          onInputChange={handleChangeInput}
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
          placeholder="모집 인원"
          inputName="target_members"
          onInputChange={handleChangeInput}
        />

        <StandardInput
          type="number"
          inputLabel="무게 입력"
          placeholder="물건 당 최대 무게 (kg)"
          inputName="weight"
          onInputChange={handleChangeInput}
        />

        <StandardInput
          type="date"
          inputLabel="참여 마감일"
          placeholder="참여 마감일"
          inputName="participation_deadline"
          onInputChange={handleChangeInput}
        />

        <Button
          type="button"
          buttonContent="다음으로"
          isActive={isActive}
          onClick={handleClickNextBtn}
        />
      </section>
    </>
  );
};

export default PartyCollect;
