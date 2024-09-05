// zustand import
import React, { useState, useId } from 'react';
import { validatePhoneNumber } from '@/utils/validate';

interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const PhoneNumberInput = ({ inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  const inputId = useId();
  
  const validateMessage = '휴대폰 번호를 올바르게 입력해 주세요.';

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
    <div role='group'>
      <label htmlFor={inputId}>휴대폰 번호</label>
      <input
        id={inputId}
        type="tel"
        defaultValue=""
        placeholder="휴대폰 번호를 입력해 주세요."
        // 혹은 style을 따로 빼서 지정해도 될 것 같다.
        className={isValidation?"":""}
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleValidateInputVal}
      />
      {!isValidation && <p>{validateMessage}</p>}
    </div>
  );
};

export default PhoneNumberInput;
