// zustand import
import React, { useState, useId } from 'react';
import { validateNickname } from '@/utils/validate';

interface propsType {
  inputName: string;
  defaultValue: string;
  onNickNameChange: (val: string) => void;
}

const NicknameInput = ({
  inputName,
  defaultValue,
  onNickNameChange,
}: propsType) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue' : 'outline-errored'}`;

  const validateMessage = !isValid
    ? '사용할 수 없는 닉네임 입니다.'
    : '사용할 수 있는 닉네임 입니다.';

  const validateInputVal = (val: string) => {
    setIsValid(validateNickname(val));
  };

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    validateInputVal(inputVal);
    checkInputFilled(inputVal);
    onNickNameChange(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div
      role="group"
      aria-label="닉네임 입력 필드"
      className="flex flex-col gap-y-1"
    >
      <label className="text-sub-2" htmlFor={inputId}>
        닉네임
      </label>
      <input
        id={inputId}
        type="text"
        value={inputVal}
        defaultValue={defaultValue}
        className={inputStyle(isValid)}
        placeholder="닉네임을 입력해 주세요."
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleChangeInput}
      />
      {/* 이미 있는 닉네임일 경우 안내 문구 뜨게 */}

      {isEnteredVal && (
        <p
          className={`text-xs font-normal ${isValid ? 'text-mainblue' : 'text-errored'}`}
        >
          {validateMessage}
        </p>
      )}
    </div>
  );
};

export default NicknameInput;
