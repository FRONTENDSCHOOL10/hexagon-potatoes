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
  const inputStyle = isValidation ? 'px-5 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-mainblue' : 'px-5 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-errorred'

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
    <div role='group' className="flex flex-col gap-y-1" >
      <label htmlFor={inputId} className="mt-2 font-pretendard">이름*</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="이름을 입력해 주세요."
        name={inputName}
        // 혹은 style을 따로 빼서 지정해도 될 것 같다.
        className={inputStyle}
        onKeyDown={handlePressEnter}
        onChange={validateInputVal}
        required
      />

      {!isValidation && <p className='text-errorred font-normal text-xs'>{validateMessage}</p>}
    </div>
  );
};

export default UserNameInput;
