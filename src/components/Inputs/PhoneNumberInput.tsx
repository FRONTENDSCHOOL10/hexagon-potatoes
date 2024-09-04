// zustand import
import React, { useState } from 'react';
import { validatePhoneNumber } from '@/utils/validate';

interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const PhoneNumberInput = ({ labelFor, inputId, inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  let validateMessage = '휴대폰 번호를 올바르게 입력해 주세요.';

  const handleValidateInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setIsValidation(validatePhoneNumber(inputVal));
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <>
      <label htmlFor={labelFor}>휴대폰 번호</label>
      <input
        id={inputId}
        type="tel"
        defaultValue=""
        placeholder="휴대폰 번호를 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleValidateInputVal}
      />

      {!isValidation && <p>{validateMessage}</p>}
    </>
  );
};

export default PhoneNumberInput;
