import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import useFetch from '@/hooks/useFetch';
import StandardInput from '@/components/Inputs/StandardInput';
import Dropdown from '@/components/Dropdown/Dropdown';
import Button from '@/components/Buttons/Button';
import AddressInput from '@/components/Inputs/AddressInput';
import AddImage from '@/components/AddImage/AddImage';
import { categories } from '@/components/Dropdown/DropdownList';

const itemData = {
  item_category: '',
  item_name: '',
  item_price: '',
  item_weight: '',
  item_size: '',
  item_link: '',
  item_photo: [],
  address: '',
  detail_address: '',
};

// 로그인된 사용자 아이디 가져오기

const JoinPartyPage = () => {
  const [data, setData] = useState(itemData);
  const [isActive, setIsActive] = useState(false);
  const uuid = uuidv4();
  const navigate = useNavigate();

  const {} = useFetch(
    'https://hexagon-potatoes.pockethost.io/api/collections/party_member/records'
  );

  const getAuthData = async () => {
    try {
      const res = await localStorage.getItem('authToken');
      await localStorage.getItem('authId');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImg = (id: number) => {
    const updatedData = data.item_photo.filter((data) => data.id !== id);
    const updatedFormData = {
      ...data,
      ['item_photo']: updatedData,
    };
    setData(updatedFormData);
    checkInputFilled(updatedFormData);
  };

  const checkInputFilled = (data: typeof data) => {
    // 모든 인풋이 채워져 있는지 확인
    const isFilled = Object.values(data).every((d) => {
      if (Array.isArray(d)) return d.length !== 0;
      return d !== undefined && d !== null && d !== '';
    });
    setIsActive(isFilled);
  };

  const handleChangeInput = (inputName: string) => (value: string | number) => {
    // 데이터 받아와서 업데이트
    const updatedData = { ...data, [inputName]: value };
    setData(updatedData);
    checkInputFilled(updatedData);
  };

  const handleImgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      const updatedPhotos = [...(data.item_photo || [])];
      const newPhotos = Array.from(fileList).map((file) => {
        const objectURL = URL.createObjectURL(file);
        return { url: objectURL, id: uuid, file: file };
      });
      setData({ ...data, ['item_photo']: updatedPhotos.concat(newPhotos) });
    }
  };

  const compressImg = async (imageFile: Blob) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  };

  const createFormData = async () => {
    const formData = new FormData();

    formData.append('item_category', data.item_category);
    formData.append('item_name', data.item_name);
    formData.append('item_price', data.item_price);
    formData.append('item_weight', data.item_weight);
    formData.append('item_size', data.item_size);
    formData.append('item_link', data.item_link);
    formData.append('address', data.address);
    formData.append('detail_address', data.detail_address);

    const compressedImages = await Promise.all(
      data.item_photo.map(async (photo: any) => {
        const compressedFile = await compressImg(photo.file);
        return compressedFile;
      })
    );

    compressedImages.forEach((file) => {
      formData.append('item_photo', file);
    });

    return formData;
  };

  const fetchData = async () => {
    const formData = await createFormData();
    await axios
      .post(
        'https://hexagon-potatoes.pockethost.io/api/collections/party_member/records',
        formData
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClickCreatePartyBtn = () => {
    fetchData();
    getAuthData();

    // navigate('/home/party/${party_id}');
  };

  return (
    <section className="flex flex-col gap-y-3">
      <h1 className="sr-only">파티 참여 페이지</h1>
      <form className="flex flex-col gap-y-3">
        <AddImage
          onInputChange={handleImgInputChange}
          onClickDeleteBtn={handleRemoveImg}
          imgData={data.item_photo}
        />
        <StandardInput
          inputName="item_name"
          type="text"
          inputLabel="구매 상품명"
          placeholder="상품 이름"
          onInputChange={handleChangeInput}
        />
        <StandardInput
          inputName="item_price"
          type="number"
          inputLabel="상품 가격"
          placeholder="상품 가격"
          onInputChange={handleChangeInput}
        />
        <Dropdown
          dropdownName="item_category"
          label="카테고리"
          list={categories}
          defaultMsg="상품의 카테고리를 선택해 주세요"
          onInputChange={handleChangeInput}
        />
        <StandardInput
          inputName="item_weight"
          type="number"
          inputLabel="상품 무게"
          placeholder="상품 무게"
          onInputChange={handleChangeInput}
        />
        <StandardInput
          inputName="item_size"
          type="text"
          inputLabel="상품 사이즈"
          placeholder="상품 사이즈"
          onInputChange={handleChangeInput}
        />
        <StandardInput
          inputName="item_link"
          type="url"
          inputLabel="상품 링크"
          placeholder="상품 링크"
          onInputChange={handleChangeInput}
        />
        {/* <AddressInput inputName="address" onInputChange={handleChangeInput} /> */}
        <AddressInput
          addressInputName="address"
          detailAddressInputName="detail_address"
          onAddressChange={handleChangeInput}
        />
      </form>

      <Button
        type="submit"
        buttonContent="파티 생성하기"
        // isActive={isActive}
        onClick={handleClickCreatePartyBtn}
      />
    </section>
  );
};

export default JoinPartyPage;
