interface propsType {
  inputName: string;
  defaultAddressVal: string;
  defaultOptionalAddressVal: string;
  onAddressChange: (name: string) => (val: string | number) => void;
}

import { useState, useId } from 'react';

// const AddressInput = ({
//   inputName,
//   defaultAddressVal,
//   defaultOptionalAddressVal,
//   onAddressChange,
// }: propsType) => {

// };

// export default AddressInput;

import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import ModalLayout from '@/layout/Modal';

const DaumPost = ({
  inputName,
  defaultAddressVal,
  defaultOptionalAddressVal,
  onAddressChange,
}: propsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [addressInputVal, setAddressInputVal] = useState('');
  const [optionalAddressInputVal, setOptionalAddressInputVal] = useState('');

  const addressInputId = useId();
  const optionalAddressInputId = useId();

  const inputStyle =
    'text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-mainblue';

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setAddressInputVal(inputVal);
    checkInputFilled(inputVal);
    onAddressChange(inputName)(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddressInputVal(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <div
      role="group"
      aria-label="주소 입력 필드"
      className="flex flex-col gap-y-1"
    >
      <label className="text-sub-2" htmlFor={addressInputId}>
        주소*
      </label>
      <input
        value={addressInputVal}
        id={addressInputId}
        type="text"
        defaultValue={defaultAddressVal}
        placeholder="주소를 입력해 주세요."
        name={inputName}
        className={inputStyle}
        onChange={handleChangeInput}
        onClick={handleClick}
        required
        readOnly
      />
      <label className="text-sub-2 mt-2" htmlFor={optionalAddressInputId}>
        상세 주소(옵션)
      </label>
      <input
        id={optionalAddressInputId}
        type="text"
        value={defaultOptionalAddressVal}
        defaultValue={defaultOptionalAddressVal}
        placeholder="상세 주소를 입력해 주세요."
        name={inputName}
        className={inputStyle}
        onKeyDown={handlePressEnter}
        onChange={(e) => {
          setOptionalAddressInputVal(e.target.value);
        }}
      />

      <ModalLayout isOpen={isOpen}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </ModalLayout>
    </div>
  );
};

export default DaumPost;
