// zustand import
import React, { useState } from 'react';
import { validateName } from '@/utils/validate';

interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const UserNameInput = ({ labelFor, inputId, inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  let validateMessage = '올바른 이름이 아닙니다.';

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
    <>
      <label htmlFor={labelFor}>이름</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="이름을 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={validateInputVal}
      />

      {!isValidation && <p>{validateMessage}</p>}
    </>
  );
};

export default UserNameInput;
