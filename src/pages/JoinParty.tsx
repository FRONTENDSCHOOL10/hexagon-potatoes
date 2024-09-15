import React, { useId, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import StandardInput from '@/components/Inputs/StandardInput';
import Dropdown from '@/components/Dropdown/Dropdown';
import Button from '@/components/Buttons/Button';
import AddressInput from '@/components/Inputs/AddressInput';
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
};

const JoinPartyPage = () => {
  const [formData, setFormData] = useState(itemData);
  const [isActive, setIsActive] = useState(false);
  const uuid = uuidv4();
  const FileInputRef = useRef(null);
  const imageInputId = useId();

  const handlePressEnter = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter') {
      const imageInputElem = document.getElementById(imageInputId);
      imageInputElem?.click();
    }
  };

  const handleClickCreatePartyBtn = () => {
    const navigate = useNavigate();
    navigate('/home/party/${party_id}');
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

  const handleImgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      const updatedPhotos = [...(formData.item_photo || [])];
      for (let file of fileList) {
        const objectURL = URL.createObjectURL(file);
        setFormData({
          ...formData,
          ['item_photo']: updatedPhotos.concat([{ url: objectURL, id: uuid }]),
        });
      }
    }
  };

  const handleRemoveImg = (id: number) => {
    const updatedData = formData.item_photo.filter((data) => data.id !== id);
    setFormData((prev) => ({
      ...prev,
      ['item_photo']: updatedData,
    }));
  };

  return (
    <section className="flex flex-col gap-y-3">
      <h1 className="sr-only">파티 참여 페이지</h1>
      {/* swiper */}
      <form className="flex flex-col gap-y-3">
        <div
          role="group"
          aria-label="상품 사진 선택 필드"
          className="relative flex flex-col gap-y-3 text-button"
        >
          <span className="text-button">구매 상품 사진</span>
          <label
            onKeyDown={handlePressEnter}
            tabIndex={0}
            className="relative flex size-[4.375rem] flex-col items-center justify-center rounded-xl border-none bg-gray-100 shadow-shadow-blue"
            htmlFor={imageInputId}
          >
            <svg className="size-4 text-gray-300">
              <use href="/assets/sprite-sheet.svg#addimage" />
            </svg>
            <span className="leading-none text-gray-300">1 / 5</span>
          </label>
          <input
            ref={FileInputRef}
            accept="image/jpg, image/jpeg, image/png"
            multiple
            className="sr-only absolute left-0 top-[2.13rem] size-[4.375rem] rounded-xl border-none bg-gray-100 text-transparent opacity-0"
            type="file"
            id={imageInputId}
            onChange={handleImgInputChange}
          />
          {formData.item_photo !== undefined &&
            formData.item_photo?.length !== 0 && (
              <ul className="absolute left-[4.375rem] top-[2.13rem] ml-3 flex flex-row gap-x-3">
                {formData.item_photo.map((data, idx) => (
                  <li
                    key={idx}
                    className="relative rounded-xl shadow-shadow-blue"
                  >
                    <button
                      type="button"
                      className="absolute right-1 top-1 rounded-full bg-gray-600 p-1 text-white hover:bg-mainblue hover:text-white"
                      onClick={() => handleRemoveImg(data.id)}
                    >
                      <svg className="size-[0.575rem] fill-current">
                        <use href="/assets/sprite-sheet.svg#x" />
                      </svg>
                    </button>
                    <img
                      className="size-[4.375rem] rounded-xl"
                      src={data.url}
                      alt="이미지 미리보기"
                    />
                  </li>
                ))}
              </ul>
            )}
          <p className="text-caption">
            상품과 무관한 사진을 첨부하면 노출 제한 처리될 수 있습니다. 사진첨부
            시 개인정보가 노출되지 않도록 유의해주세요.
          </p>
        </div>
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
        isActive={isActive}
        onClick={handleClickCreatePartyBtn}
      />
    </section>
  );
};

export default JoinPartyPage;
