import { useState } from 'react';
import { validateEmail } from '@/utils/validate';

interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const EmailInput = ({ labelFor, inputId, inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  let validateMessage = '올바른 이메일 형식이 아닙니다.';
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
    <>
      <label htmlFor={labelFor}>이메일</label>
      <input
        id={inputId}
        type="email"
        defaultValue=""
        placeholder="이메일을 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleValidateInputVal}
      />

      {!isValidation && <p>{validateMessage}</p>}
    </>
  );
};

export default EmailInput;
