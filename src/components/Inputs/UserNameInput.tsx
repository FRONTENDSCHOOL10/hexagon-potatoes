import React, { useState, useId } from 'react';
import { validateName } from '@/utils/validate';

interface PropTypes {
  inputName: string;
  defaultValue?: string;
  onUserNameChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
}

const UserNameInput = ({
  inputName,
  defaultValue,
  onUserNameChange,
  onValidChange,
}: PropTypes) => {
  const [inputVal, setInputVal] = useState(defaultValue || '');
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(!!defaultValue);

  const inputId = useId();

  const inputStyle = `text-sub-2 px-5 py-2 h-[2.8125rem] relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue' : 'outline-errored border-errored'}`;

  const validateMessage = '최소 2자 이상의 한글로 입력해주세요.';

  const validateInputVal = (val: string) => {
    const isValidInput = validateName(val);
    setIsValid(isValidInput);
    onValidChange(isValidInput);
  };

  const checkInputFilled = (val: string) => {
    setIsEnteredVal(val.trim() !== '');
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    validateInputVal(value);
    checkInputFilled(value);
    onUserNameChange(inputName)(value);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div
      role="group"
      aria-label="이름 입력 필드"
      className="relative flex flex-col gap-y-1"
    >
      <label htmlFor={inputId} className="text-button">
        이름
      </label>
      <p className="absolute right-0 top-1 text-sub-2 text-mainblue">
        최소 2자 이상의 한글
      </p>
      <input
        id={inputId}
        value={inputVal}
        type="text"
        placeholder="이름을 입력해 주세요."
        name={inputName}
        className={inputStyle}
        onKeyDown={handlePressEnter}
        onChange={handleChangeInput}
        required
      />
      {isEnteredVal && !isValid && (
        <p role="alert" className="text-xs font-normal text-errored">
          {validateMessage}
        </p>
      )}
    </div>
  );
};

export default UserNameInput;
