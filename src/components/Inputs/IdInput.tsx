interface propsType {
  inputName: string;
  defaultValue: string;
  onIdChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
}
// zustand import
import React, { useState, useId } from 'react';
import { validateId } from '@/utils/validate';

const IdInput = ({
  onValidChange,
  inputName,
  defaultValue,
  onIdChange,
}: propsType) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue' : 'outline-errored'}`;

  const validateMessage = !isValid
    ? '사용할 수 없는 아이디입니다.'
    : '사용가능한 아이디 입니다.';

  // 이미 존재하는 아이디임을 확인도 해야함.

  const validateInputVal = (val: string) => {
    setIsValid(validateId(val));
    onValidChange(validateId(val));
  };

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    validateInputVal(inputVal);
    checkInputFilled(inputVal);
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
      className="flex flex-col gap-y-1"
    >
      <label className="text-sub-2" htmlFor={inputId}>
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

export default IdInput;
