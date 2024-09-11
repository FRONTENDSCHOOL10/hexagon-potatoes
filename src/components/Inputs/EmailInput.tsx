interface propsType {
  inputName: string;
  defaultValue: string;
  onEmailChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
}

import { useState, useId } from 'react';
import { validateEmail } from '@/utils/validate';

const EmailInput = ({
  onEmailChange,
  onValidChange,
  inputName,
  defaultValue,
}: propsType) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue' : 'outline-errored'}`;

  const validateMessage = !isValid
    ? '올바른 이메일 형식이 아닙니다.'
    : '사용할 수 있는 이메일 입니다.';

  // 이미 존재하는 이메일임을 확인도 해야함.

  const validateInputVal = (val: string) => {
    setIsValid(validateEmail(val));
    onValidChange(validateEmail(val));
  };

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    validateInputVal(inputVal);
    checkInputFilled(inputVal);
    onEmailChange(inputName)(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div
      role="group"
      aria-label="이메일 입력 필드"
      className="flex flex-col gap-y-1"
    >
      <label className="text-sub-2" htmlFor={inputId}>
        이메일*
      </label>
      <input
        id={inputId}
        value={inputVal}
        type="email"
        defaultValue={defaultValue}
        className={inputStyle(isValid)}
        placeholder="이메일을 입력해 주세요."
        name={inputName}
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

export default EmailInput;
