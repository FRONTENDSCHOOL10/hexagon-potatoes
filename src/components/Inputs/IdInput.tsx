// zustand import
import React, { useState } from 'react';
import { validateId } from '@/utils/validate';

interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const IdInput = ({ labelFor, inputId, inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  let validateMessage = '올바른 아이디 형식이 아닙니다.';
  // 이미 존재하는 아이디임을 확인도 해야함.

  const validateInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setIsValidation(validateId(inputVal));
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <>
      <label htmlFor={labelFor}>아이디</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="아이디를 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={validateInputVal}
      />

      {!isValidation && <p>{validateMessage}</p>}
    </>
  );
};

export default IdInput;
