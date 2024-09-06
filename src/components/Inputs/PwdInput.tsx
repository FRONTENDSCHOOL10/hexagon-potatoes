import React, { useState, useRef, useId } from 'react';
import { validatePwd } from '@/utils/validate';

interface propsType {
  inputName: string;
}

const PwdInput = ({ inputName }: propsType) => {
  const [isValidation, setIsValidation] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [isShowConfirmedPwd, setIsShowConfirmedPwd] = useState(false);
  const [isEnteredPwd, setIsEnteredPwd] = useState(false);
  const [isEnteredConfirmedPwd, setIsEnteredConfirmedPwd] = useState(false);
  const pwdInputRef = useRef<HTMLInputElement>(null);
  const confirmedPwdRef = useRef<HTMLInputElement>(null);

  const pwdInputId = useId();
  const pwdConfirmInputId = useId();

  const confirmedPwdMessage = !isConfirmed
    ? '비밀번호가 일치하지 않습니다.'
    : '비밀번호가 일치 합니다.';

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid ? 'outline-mainblue' : 'outline-errored'}`;

  const handleValidateInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    if (inputVal) {
      setIsEnteredPwd(true);
      setIsValidation(validatePwd(inputVal));
    } else {
      setIsEnteredPwd(false);
    }
  };

  const handleConfirmPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    inputVal ? setIsEnteredConfirmedPwd(true) : setIsEnteredConfirmedPwd(false);

    pwdInputRef.current && pwdInputRef.current.value === inputVal
      ? setIsConfirmed(true)
      : setIsConfirmed(false);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  const handleShowPwd = (
    ref: React.RefObject<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'pwd') {
      setIsShowPwd((prev) => {
        if (ref.current?.value) {
          !prev ? (ref.current.type = 'text') : (ref.current.type = 'password');
        }
        return !prev;
      });
    } else if (type === 'confirmedPwd') {
      setIsShowConfirmedPwd((prev) => {
        if (ref.current?.value) {
          !prev ? (ref.current.type = 'text') : (ref.current.type = 'password');
        }
        return !prev;
      });
    }
  };

  const handleDeleteInputVal = (type: string) => {
    if (type === 'pwd') {
      pwdInputRef.current!.value = '';
      setIsEnteredPwd(false);
      setIsValidation(true);
    } else if (type === 'confirmedPwd') {
      confirmedPwdRef.current!.value = '';
      setIsEnteredConfirmedPwd(false);
      setIsValidation(true);
    }
  };

  return (
    <>
      <div
        role="group"
        aria-label="비밀번호 입력 필드"
        className="relative flex flex-col gap-y-1"
      >
        <label className="text-sub-2" htmlFor={pwdInputId}>
          비밀번호
        </label>
        <input
          ref={pwdInputRef}
          id={pwdInputId}
          type="password"
          defaultValue=""
          placeholder="비밀번호를 입력해 주세요."
          className={inputStyle(isValidation)}
          name={inputName}
          onKeyDown={handlePressEnter}
          onChange={handleValidateInputVal}
        />

        {isEnteredPwd && (
          <>
            <button
              className="absolute right-0 top-[48px] mr-10 text-sub-2"
              onClick={() => handleShowPwd(pwdInputRef, 'pwd')}
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
              className="absolute right-0 top-[49px] mr-5 text-sub-2"
              onClick={() => handleDeleteInputVal('pwd')}
            >
              <svg className="size-3 fill-current text-gray-200">
                <use href="/assets/sprite-sheet.svg#x" />
              </svg>
            </button>
          </>
        )}
        {!isValidation && isEnteredPwd && (
          <p className="text-xs font-normal text-errored">
            올바른 비밀번호가 아닙니다.
          </p>
        )}
      </div>

      <div
        role="group"
        aria-label="비밀번호 재입력 필드"
        className="relative flex flex-col gap-y-1"
      >
        <label htmlFor={pwdConfirmInputId} className="mt-2 text-sub-2">
          비밀번호 확인
        </label>
        <input
          ref={confirmedPwdRef}
          id={pwdConfirmInputId}
          type="password"
          defaultValue=""
          placeholder="비밀번호를 입력해 주세요."
          className={inputStyle(isConfirmed)}
          name={inputName}
          onKeyDown={handlePressEnter}
          onChange={handleConfirmPwd}
        />
        {isEnteredConfirmedPwd && (
          <>
            <button
              className="absolute right-0 top-[48px] mr-10 text-sub-2"
              onClick={() => handleShowPwd(confirmedPwdRef, 'confirmedPwd')}
            >
              <svg className="size-3.5 fill-current text-gray-200">
                <use
                  href={
                    isShowConfirmedPwd
                      ? '/assets/sprite-sheet.svg#eye'
                      : '/assets/sprite-sheet.svg#eyecrossed'
                  }
                />
              </svg>
            </button>

            <button
              className="absolute right-0 top-[49px] mr-5 text-sub-2"
              onClick={() => handleDeleteInputVal('confirmedPwd')}
            >
              <svg className="size-3 fill-current text-gray-200">
                <use
                  href={pwdInputRef.current ? '/assets/sprite-sheet.svg#x' : ''}
                />
              </svg>
            </button>
          </>
        )}
        {isEnteredConfirmedPwd && (
          <p
            className={
              isConfirmed
                ? 'text-caption text-mainblue'
                : 'text-caption text-errored'
            }
          >
            {confirmedPwdMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default PwdInput;
