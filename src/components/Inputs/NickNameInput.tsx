// zustand import
import React, { useState, useId } from 'react';
import { validateNickname } from '@/utils/validate';

interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const NicknameInput = ({ inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  const inputId = useId();
  
  const validateMessage = !isValidation ? '이미 존재하는 닉네임 입니다.':'사용할 수 있는 닉네임 입니다.';

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
    <div role='group'>
      <label htmlFor={inputId}>닉네임</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="닉네임을 입력해 주세요."
        // 혹은 style을 따로 빼서 지정해도 될 것 같다.
        className={isValidation?"":""}
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={validateInputVal}
      />
      {/* 이미 있는 닉네임일 경우 안내 문구 뜨게 */}
      <p>{validateMessage}</p>
    </div>
  );
};

export default NicknameInput;
