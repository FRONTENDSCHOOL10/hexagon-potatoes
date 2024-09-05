interface propsType {
  inputName: string;
}

import { useState, useId } from 'react';
import { validateEmail } from '@/utils/validate';


const EmailInput = ({ inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  const inputId = useId();
  
  const validateMessage = !isValidation ? '올바른 이메일 형식이 아닙니다.' : "사용할 수 있는 이메일 입니다.";
  // 이미 존재하는 이메일임을 확인도 해야함.

  const handleValidateInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setIsValidation(validateEmail(inputVal));
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div role='group'>
      <label htmlFor={inputId}>이메일</label>
      <input
        id={inputId}
        type="email"
        defaultValue=""
        // 혹은 style을 따로 빼서 지정해도 될 것 같다.
        className={isValidation?"":""}
        placeholder="이메일을 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleValidateInputVal}
      />

      <p>{validateMessage}</p>
    </div>
  );
};

export default EmailInput;
