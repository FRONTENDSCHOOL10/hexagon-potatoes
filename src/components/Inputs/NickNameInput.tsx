// zustand import
import React, { useState, useId } from 'react';
import { validateId, validateNickname } from '@/utils/validate';
import { checkDuplicate } from '@/utils/checkDuplicate';

interface PropTypes {
  inputName: string;
  defaultValue?: string;
  onNickNameChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
}

const NicknameInput = ({
  inputName,
  defaultValue,
  onNickNameChange,
  onValidChange,
}: PropTypes) => {
  const [isValid, setIsValid] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 px-5 py-2 h-[2.8125rem] relative pl-5 pr-16 py-2 rounded-xl w-full border  outline-1 ${(isValid && isDuplicate) || !isEnteredVal ? 'outline-mainblue border-gray-200' : 'outline-errored border-errored'}`;

  const validationMessage = () => {
    if (!isEnteredVal) return '';
    if (!isValid)
      return `2~10자의 공백을 제외하고 입력해주세요. (모든 기호 가능)`;
    if (!isDuplicate) return '중복된 닉네임입니다.';
  };
  const validateInputVal = async (val: string) => {
    const isValidInput = validateNickname(val);
    const isDuplicate = await checkDuplicate('nickname', val);
    setIsValid(isValidInput);
    setIsDuplicate(isDuplicate);
    onValidChange(isValidInput && isDuplicate);
  };

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    validateInputVal(inputVal);
    checkInputFilled(inputVal);
    onNickNameChange(inputName)(inputVal);
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
      className="relative flex flex-col gap-y-1"
    >
      <label className="text-button" htmlFor={inputId}>
        닉네임
      </label>
      <p className="absolute right-0 top-1 text-sub-2 text-mainblue">
        2~10자 공백 제외 모든 기호 가능
      </p>
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

      {isEnteredVal && (
        <p role="alert" className="text-xs font-normal text-errored">
          {validationMessage()}
        </p>
      )}
    </div>
  );
};

export default NicknameInput;
