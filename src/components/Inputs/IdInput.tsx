import React, { useState, useId } from 'react';
import { validateId } from '@/utils/validate';

interface PropTypes {
  inputName: string;
  defaultValue?: string;
  onIdChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
  validateOnChange?: boolean; // 추가: 실시간 검증 여부를 결정
}

const IdInput = ({
  inputName,
  defaultValue,
  onIdChange,
  onValidChange,
  validateOnChange = true, // 기본값: true
}: PropTypes) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState(defaultValue || '');
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue' : 'outline-errored'}`;

  // Validation message based on validity
  const validateMessage = !isValid
    ? '사용할 수 없는 아이디입니다.'
    : '사용가능한 아이디입니다.';

  const validateInputVal = (val: string) => {
    const isValidInput = validateId(val);
    setIsValid(isValidInput);
    onValidChange(isValidInput);
  };

  const checkInputFilled = (val: string) => {
    setIsEnteredVal(val.trim() !== '');
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    checkInputFilled(value);

    if (validateOnChange) {
      validateInputVal(value);
    }

    onIdChange(inputName)(value);
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
      className="flex flex-col gap-y-1"
    >
      <label className="text-button" htmlFor={inputId}>
        아이디
      </label>
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
      {validateOnChange && isEnteredVal && !isValid && (
        <p role="alert" className="text-xs font-normal text-errored">
          {validateMessage}
        </p>
      )}
    </div>
  );
};

export default IdInput;
