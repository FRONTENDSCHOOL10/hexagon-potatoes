import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { Helmet } from 'react-helmet-async';

interface ItemData {
  item_category: string;
  item_name: string;
  item_price: string;
  item_weight: string;
  item_size: string;
  item_link: string;
  item_photo: ImageFile[];
  address: string;
  detail_address: string;
}

interface ImageFile {
  url: string;
  id: string;
  file: File;
}

interface AuthUserData {
  id: string;
  token: string;
}

const itemData: ItemData = {
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

const JoinPartyPage = () => {
  const [data, setData] = useState<ItemData>(itemData);
  const [isActive, setIsActive] = useState(false);
  const [authUserData, setAuthUserData] = useState<AuthUserData>({
    id: '',
    token: '',
  });

  const uuid = uuidv4();
  const navigate = useNavigate();
  // const { partyId } = useLocation().state as { partyId: string };

  useEffect(() => {
    const id = localStorage.getItem('authId');
    const token = localStorage.getItem('authToken');
    if (id && token) {
      setAuthUserData({ id, token });
    }
  }, []);

  const { data: loginUserData } = useFetch(
    authUserData.id
      ? `${import.meta.env.VITE_PB_URL}api/collections/users/records/${authUserData.id}`
      : ''
  );

  // const { data: partyData } = useFetch(
  //   authUserData.id
  //     ? `${import.meta.env.VITE_PB_URL}api/collections/party/records/${partyId}`
  //     : ''
  // );

  const handleRemoveImg = (id: string) => {
    const updatedData = data.item_photo.filter((photo) => photo.id !== id);
    setData((prevData) => ({ ...prevData, item_photo: updatedData }));
    checkInputFilled({ ...data, item_photo: updatedData });
  };

  const checkInputFilled = (updatedData: ItemData) => {
    const isFilled = Object.entries(updatedData).every(([key, value]) => {
      if (Array.isArray(value)) return value.length !== 0;
      if (key === 'detail_address') return true;
      return value !== undefined && value !== '';
    });
    setIsActive(isFilled);
  };

  const handleChangeInput = (inputName: string) => (value: string | number) => {
    const updatedData = { ...data, [inputName]: value };
    setData(updatedData);
    checkInputFilled(updatedData);
  };

  const handleImgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const newPhotos = Array.from(fileList).map((file) => ({
        url: URL.createObjectURL(file),
        id: uuid,
        file,
      }));
      setData((prevData) => ({
        ...prevData,
        item_photo: [...prevData.item_photo, ...newPhotos],
      }));
    }
  };

  const compressImg = async (imageFile: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error(error);
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
    formData.append('name', loginUserData.name);
    formData.append('nickname', loginUserData.nickname);

    const compressedImages = await Promise.all(
      data.item_photo.map(async (photo) => {
        const compressedFile = await compressImg(photo.file);
        return compressedFile;
      })
    );

    compressedImages.forEach((file) => {
      if (file) formData.append('item_photo', file);
    });

    return formData;
  };

  const fetchData = async () => {
    try {
      const formData = await createFormData();
      const { address, detail_address } = data;

      await axios.patch(
        `${import.meta.env.VITE_PB_URL}api/collections/users/records/${authUserData.id}`,
        {
          address,
          detail_address,
          participate_party: [
            ...(loginUserData?.participating_party || []),
            'uh9y0kfq4nxf1lx',
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${authUserData.token}`,
          },
        }
      );

      const member = await axios.post(
        `${import.meta.env.VITE_PB_URL}api/collections/party_member/records`,
        formData
      );

      // await axios.patch(
      // `${import.meta.env.VITE_PB_URL}api/collections/party/records/${partyId}`,
      // { member_ids: [...(partyData?.member_ids || []), member.data.id] }
      // );
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickCreatePartyBtn = async () => {
    await fetchData();
    // navigate(`/home/party/${partyId}`);
  };

  return (
    <>
      <Helmet>
        <title>파티 참여 | Shipmate</title>
        <meta name="description" content="파티 참여 페이지입니다." />
        <meta
          name="keywords"
          content="해외 직구, 직구, 파티, 참여, 상품, 사진, 쇼핑"
        />
      </Helmet>
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
          <AddressInput
            addressInputName="address"
            detailAddressInputName="detail_address"
            onAddressChange={handleChangeInput}
          />
        </form>

        <Button
          type="submit"
          buttonContent="파티 참여하기"
          isActive={isActive}
          onClick={handleClickCreatePartyBtn}
        />
      </section>
    </>
  );
};

export default JoinPartyPage;
