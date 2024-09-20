// zustand import
import React, { useState, useId } from 'react';
import { validatePhoneNumber } from '@/utils/validate';
import checkDuplicate from '@/utils/checkDuplicate';

interface PropTypes {
  inputName: string;
  defaultValue?: string;
  onPhoneNumberChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
}
const PhoneNumberInput = ({
  inputName,
  defaultValue,
  onPhoneNumberChange,
  onValidChange,
}: PropTypes) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(true);
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 px-5 py-2 h-[2.8125rem] relative pl-5 pr-16 py-2 rounded-xl w-full border outline-1 ${(isValid && isDuplicate) || !isEnteredVal ? 'outline-mainblue  border-gray-200' : 'outline-errored border-errored'}`;

  const validationMessage = () => {
    if (!isEnteredVal) return '';
    if (!isValid) return '010은 고정, 이하 8자리 숫자로 입력해주세요.';
    if (!isDuplicate) return '중복된 번호입니다.';
  };

  const validateInputVal = async (val: string) => {
    const isValidInput = validatePhoneNumber(val);
    const isDuplicate = await checkDuplicate('phone_number', val);
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
    onPhoneNumberChange(inputName)(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div
      role="group"
      aria-label="휴대폰 번호 입력 필드"
      className="relative flex flex-col gap-y-1"
    >
      <label className="text-button" htmlFor={inputId}>
        휴대폰 번호
      </label>
      <p className="absolute right-0 top-1 text-sub-2 text-mainblue">
        010은 고정, 이하 8자리 숫자
      </p>
      <input
        id={inputId}
        type="tel"
        value={inputVal}
        placeholder="휴대폰 번호를 입력해 주세요."
        defaultValue={defaultValue}
        className={inputStyle(isValid)}
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

export default PhoneNumberInput;
