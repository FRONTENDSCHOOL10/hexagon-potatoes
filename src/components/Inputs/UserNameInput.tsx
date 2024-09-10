// zustand import
import React, { useState, useId } from 'react';
import { validateName } from '@/utils/validate';

interface propsType {
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
}: propsType) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue' : 'outline-errored'}`;

  const validateMessage = '올바른 이름이 아닙니다.';

  const validateInputVal = (val: string) => {
    setIsValid(validateName(val));
    onValidChange(validateName(val));
  };

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    validateInputVal(inputVal);
    checkInputFilled(inputVal);
    onUserNameChange(inputName)(inputVal);
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
      className="flex flex-col gap-y-1"
    >
      <label htmlFor={inputId} className="text-sub-2">
        이름*
      </label>
      <input
        id={inputId}
        value={inputVal}
        type="text"
        defaultValue={defaultValue}
        placeholder="이름을 입력해 주세요."
        name={inputName}
        className={inputStyle(isValid)}
        onKeyDown={handlePressEnter}
        onChange={handleChangeInput}
        required
      />

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

export default UserNameInput;
