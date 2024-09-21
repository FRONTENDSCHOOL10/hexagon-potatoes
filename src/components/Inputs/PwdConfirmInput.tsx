import React, { useState, useRef, useId } from 'react';

interface propsType {
  inputName: string;
  pwdInputVal: string;
  onConfirmedPwdChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
}

const PwdConfirmInput = ({
  inputName,
  pwdInputVal,
  onConfirmedPwdChange,
  onValidChange,
}: propsType) => {
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const inputId = useId();

  const confirmedPwdMessage = isConfirmed
    ? '비밀번호가 일치 합니다.'
    : '비밀번호가 일치하지 않습니다.';

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 px-5 py-2 h-[2.8125rem] relative pl-5 pr-16 py-2 rounded-xl w-full border  outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue border-gray-200' : 'outline-errored border-errored'}`;

  const checkConfirmPwd = (val: string) => {
    const isValid = pwdInputVal === val;
    setIsConfirmed(isValid);
    onValidChange(isValid);
  };

  const checkInputFilled = (val: string) => setIsEnteredVal(val.trim() !== '');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    checkInputFilled(value);
    checkConfirmPwd(value)
    if (onConfirmedPwdChange) {
    onConfirmedPwdChange(inputName)(value);
    }
  };

  const handleBlurInput = () => {
    checkConfirmPwd(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  const handleToggleShowPwd = () => {
    setIsShowPwd((prev) => {
      if (inputRef.current) {
        inputRef.current.type = prev ? 'password' : 'text';
      }
      return !prev;
    });
  };

  const handleClearInput = () => {
    setInputVal('');
    setIsEnteredVal(false);
    setIsConfirmed(true);
  };

  return (
    <div
      role="group"
      aria-label="비밀번호 재입력 필드"
      className="relative flex flex-col gap-y-1"
    >
      <label htmlFor={inputId} className="text-button">
        비밀번호 확인
      </label>

      <input
        value={inputVal}
        ref={inputRef}
        id={inputId}
        type={isShowPwd ? 'text' : 'password'}
        placeholder="비밀번호를 한번 더 입력해 주세요."
        className={inputStyle(isConfirmed)}
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
      />

      {isEnteredVal && (
        <>
          <button
            type="button"
            className="absolute right-0 top-[2.7rem] mr-10 text-sub-2"
            onClick={handleToggleShowPwd}
          >
            <svg className="size-3.5 fill-current text-gray-200">
              <use
                href={
                  isShowPwd
                    ? '/assets/sprite-sheet.svg#eye'
                    : '/assets/sprite-sheet.svg#eyecrossed'
                }
              />
            </svg>
          </button>

          <button
            type="button"
            className="absolute right-0 top-11 mr-5 text-sub-2"
            onClick={handleClearInput}
          >
            <svg className="size-3 fill-current text-gray-200">
              <use href={'/assets/sprite-sheet.svg#x'} />
            </svg>
          </button>
        </>
      )}

      {isEnteredVal && (
        <p
          role="alert"
          className={`text-caption ${isConfirmed ? 'text-mainblue' : 'text-errored'}`}
        >
          {confirmedPwdMessage}
        </p>
      )}
    </div>
  );
};

export default PwdConfirmInput;
