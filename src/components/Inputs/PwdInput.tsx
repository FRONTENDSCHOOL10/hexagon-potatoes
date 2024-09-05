import React, { useState, useRef, useId } from 'react';
import { validatePwd } from '@/utils/validate';

interface propsType {
  inputName: string;
}

const PwdInput = ({ inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const pwdInputRef = useRef<HTMLInputElement>(null);
  const confirmedPwdRef = useRef<HTMLInputElement>(null);
  
  const inputId = useId();
  
  const confirmedPwdMessage = !isConfirmed ? '비밀번호가 일치하지 않습니다.' : '비밀번호가 일치 합니다.'

  console.log(isValidation)
  
  const inputStyle = (state:boolean) => {
    const style = state ? 'px-5 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-mainblue' : 'px-5 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-errorred'
    return style;
  }
  
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
    <div role='group' aria-label="비밀번호 입력 필드" className=" flex flex-col gap-y-1">
      <label htmlFor={inputId} >비밀번호</label>
      <input
        ref={pwdInputRef}
        id={inputId}
        type="password"
        defaultValue=""
        placeholder="비밀번호를 입력해 주세요."
        className={inputStyle(isValidation)}
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleValidateInputVal}
      />
      <button className='absolute' onClick={() => handleShowPwd(pwdInputRef)}>비밀번호 표시</button>
      {!isValidation && <p className='text-errorred font-normal text-xs'>올바른 비밀번호가 아닙니다.</p>}

      <label htmlFor={inputId}>비밀번호 확인</label>
      <input
        ref={confirmedPwdRef}
        id={inputId}
        type="password"
        defaultValue=""
        placeholder="비밀번호를 입력해 주세요."
        className={inputStyle(isConfirmed)}
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleConfirmPwd}
      />
      <button onClick={() => handleShowPwd(confirmedPwdRef)}>
        비밀번호 표시
      </button>
      <p className='text-errored font-normal text-xs'>{confirmedPwdMessage}</p>
    </div>
  );
};

export default PwdInput;
