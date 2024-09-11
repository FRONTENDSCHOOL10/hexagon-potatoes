import { useId, useState } from 'react';
import StandardInput from '@/components/Inputs/StandardInput';
// import AddressInput from '@/components/Inputs/AddressInput';
import Button from '@/components/Buttons/Button';
import DaumPost from '@/components/Inputs/AddressInput';

const itemData = {
  item_category: '물건',
  item_name: '',
  item_price: '',
  item_weight: '',
  item_size: '',
  item_link: '',
  item_photo: ['먼가'],
  address: '주소',
};

const JoinPartyPage = () => {
  const [formData, setFormData] = useState(itemData);
  const [isActive, setIsActive] = useState(false);
  const imageInputId = useId();
  const handleClickAddImgBtn = () => {};

  const handleClickCreatePartyBtn = () => {};

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
      <h1 className="sr-only">파티 참여 페이지</h1>
      <div>구매 상품 사진</div>
      <div className="text-sub-2 relative">
        <label className="relative z-10" htmlFor={imageInputId}>
          <svg className="inline-block size-4 bg-slate-600">
            <use href="/assets/sprite-sheet.svg#addimage" />
          </svg>
        </label>
        <input
          className="font-white absolute left-0 top-0 size-16 appearance-none border-none bg-orange-400"
          type="file"
          id={imageInputId}
        />
      </div>
      <span>
        상품과 무관한 사진을 첨부하면 노출 제한 처리될 수 있습니다. 사진첨부 시
        개인정보가 노출되지 않도록 유의해주세요.
      </span>
      {/* 이미지 첨부 삭제, multiple */}
      <form>
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
        <StandardInput
          inputName="item_category"
          type="string"
          inputLabel="카테고리"
          placeholder="카테고리"
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
        <DaumPost />
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
