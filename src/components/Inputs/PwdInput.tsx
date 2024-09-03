import React, { useState, useRef } from 'react';
import { validatePwd } from '@/utils/validate';

interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const PwdInput = ({ labelFor, inputId, inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const pwdInputRef = useRef<HTMLInputElement>(null);
  const confirmedPwdRef = useRef<HTMLInputElement>(null);

  const handleValidateInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setIsValidation(validatePwd(inputVal));
  };

  const handleConfirmPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    pwdInputRef.current && pwdInputRef.current.value === inputVal
      ? setIsConfirmed(true)
      : setIsConfirmed(false);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  const handleShowPwd = (ref: React.RefObject<HTMLInputElement>) => {
    setIsShowPwd((prev) => {
      if (ref.current) {
        prev ? (ref.current.type = 'text') : (ref.current.type = 'password');
      }
      return !prev;
    });
  };

  return (
    <>
      <label htmlFor={labelFor}>비밀번호</label>
      <input
        ref={pwdInputRef}
        id={inputId}
        type="password"
        defaultValue=""
        placeholder="비밀번호를 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleValidateInputVal}
      />
      <button onClick={() => handleShowPwd(pwdInputRef)}>비밀번호 표시</button>
      {!isValidation && <p>올바른 비밀번호가 아닙니다.</p>}

      <label htmlFor={labelFor}>비밀번호 확인</label>
      <input
        ref={confirmedPwdRef}
        id={inputId}
        type="password"
        defaultValue=""
        placeholder="비밀번호를 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleConfirmPwd}
      />
      <button onClick={() => handleShowPwd(confirmedPwdRef)}>
        비밀번호 표시
      </button>
      {!isConfirmed && <p>비밀번호가 일치하지 않습니다.</p>}
    </>
  );
};

export default PwdInput;
