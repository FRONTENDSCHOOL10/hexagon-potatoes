// zustand import
import React, { useState } from 'react';
import { validateNickname } from '@/utils/validate';

interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const NicknameInput = ({ labelFor, inputId, inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  let validateMessage = '이미 존재하는 닉네임 입니다.';

  const validateInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setIsValidation(validateNickname(inputVal));
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <>
      <label htmlFor={labelFor}>닉네임</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="닉네임을 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={validateInputVal}
      />
      {/* 이미 있는 닉네임일 경우 안내 문구 뜨게 */}
      {!isValidation && <p>{validateMessage}</p>}
    </>
  );
};

export default NicknameInput;
