import React, { useState, useId } from 'react';
import { validateId } from '@/utils/validate';
import { checkDuplicate } from '@/utils/checkDuplicate';

interface PropTypes {
  inputName: string;
  defaultValue?: string;
  onIdChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
  validateOnChange: boolean;
}

const IdInput = ({
  inputName,
  defaultValue,
  onIdChange,
  onValidChange,
  validateOnChange = true,
}: PropTypes) => {
  const [isValid, setIsValid] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState(defaultValue || '');
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative px-5 py-2 h-[2.8125rem] rounded-xl w-full border outline-1 ${(isValid && isDuplicate) || !isEnteredVal ? 'outline-mainblue border-gray-200' : 'outline-errored border-errored'}`;

  const validationMessage = () => {
    if (!isEnteredVal) return '';
    if (!isValid) return '6~12자의 영문, 숫자 조합을 입력해주세요.';
    if (!isDuplicate) return '중복된 아이디입니다.';
  };

  const validateInputVal = async (val: string) => {
    const isValidInput = validateId(val);
    const isDuplicate = await checkDuplicate('username', val);
    setIsValid(isValidInput);
    setIsDuplicate(isDuplicate);
    onValidChange(isValidInput && isDuplicate);
  };

  const checkInputFilled = (val: string) => {
    setIsEnteredVal(val.trim() !== '');
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    checkInputFilled(inputVal);
    validateOnChange && validateInputVal(inputVal);
    onIdChange(inputName)(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div
      role="group"
      aria-label="아이디 입력 필드"
      className="relative flex flex-col gap-y-1"
    >
      <label className="text-button" htmlFor={inputId}>
        아이디
      </label>
      {validateOnChange && (
        <p className="absolute right-0 top-1 text-sub-2 text-mainblue">
          6~12자의 영문, 숫자 조합
        </p>
      )}
      <input
        id={inputId}
        value={inputVal}
        type="text"
        defaultValue={defaultValue}
        className={inputStyle(isValid)}
        placeholder="아이디를 입력해 주세요."
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

export default IdInput;
