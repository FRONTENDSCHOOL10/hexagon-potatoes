// zustand import
import React, { useState, useId } from 'react';
import { validateName } from '@/utils/validate';

interface propsType {
  inputName: string;
}

const UserNameInput = ({ inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  const inputId = useId();
  
  const validateMessage =  '올바른 이름이 아닙니다.' 

  const validateInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setIsValidation(validateName(inputVal));
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div role='group'>
      <label htmlFor={inputId}>이름</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="이름을 입력해 주세요."
        name={inputName}
        // 혹은 style을 따로 빼서 지정해도 될 것 같다.
        className={isValidation?"":""}
        onKeyDown={handlePressEnter}
        onChange={validateInputVal}
      />

      {!isValidation && <p>{validateMessage}</p>}
    </div>
  );
};

export default UserNameInput;
