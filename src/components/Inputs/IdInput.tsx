// zustand import
import React, { useState, useId } from 'react';
import { validateId } from '@/utils/validate';

interface propsType {
  inputName: string;
}

const IdInput = ({ inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  const inputId = useId();
  
  const validateMessage = !isValidation ? '사용할 수 없는 아이디입니다.':'사용가능한 아이디 입니다.'
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
    <div role='group'>
      <label htmlFor={inputId}>아이디</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="아이디를 입력해 주세요."
        // 혹은 style을 따로 빼서 지정해도 될 것 같다.
        className={isValidation?"":""}
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={validateInputVal}
      />

      <p>{validateMessage}</p>
    </div>
  );
};

export default IdInput;
