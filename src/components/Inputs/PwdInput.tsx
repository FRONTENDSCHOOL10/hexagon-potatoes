import { useRef, useState, useId } from 'react';
import { validatePwd } from '@/utils/validate';

interface PropTypes {
  inputName: string;
  onPwdChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
  validateOnChange?: boolean;
  onEnter?: (event: React.FormEvent<HTMLFormElement>) => void; // 엔터 처리 함수 추가
}

const PwdInput = ({
  onValidChange,
  inputName,
  onPwdChange,
  validateOnChange = true,
  onEnter,
}: PropTypes) => {
  const [isValid, setIsValid] = useState(true);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  const pwdInputId = useId();
  const inputStyle = (isValid: boolean) =>
    `text-sub-2 px-5 py-2 h-[2.8125rem] relative pl-5 pr-16 py-2 rounded-xl w-full border  outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue border-gray-200' : 'outline-errored border-errored'}`;

  const validateInputVal = (val: string) => {
    setIsValid(validatePwd(val));
    onValidChange(validatePwd(val));
  };

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    validateOnChange && validateInputVal(inputVal);
    checkInputFilled(inputVal);
    onPwdChange(inputName)(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (document.activeElement as HTMLElement).blur();
      if (!validateOnChange) {
        onEnter && onEnter(e); // 로그인 처리 함수 호출
      } else {
        validateInputVal(inputVal);
      }
    }
  };

  const handleShowPwd = (ref: React.RefObject<HTMLInputElement>) => {
    setIsShowPwd((prev) => {
      if (ref.current?.value) {
        !prev ? (ref.current.type = 'text') : (ref.current.type = 'password');
      }
      return !prev;
    });
  };

  const handleDeleteInputVal = () => {
    setInputVal('');
    setIsEnteredVal(false);
    setIsValid(true);
  };

  return (
    <>
      <div
        role="group"
        aria-label="비밀번호 입력 필드"
        className="relative flex flex-col gap-y-1"
      >
        <label className="text-button" htmlFor={pwdInputId}>
          비밀번호
        </label>
        {validateOnChange && (
          <p className="absolute right-0 top-1 text-sub-2 text-mainblue">
            8~15자의 영문, 숫자, 특수문자(~!@#$%^&*)
          </p>
        )}
        <input
          ref={inputRef}
          value={inputVal}
          id={pwdInputId}
          type="password"
          // defaultValue=""
          placeholder="비밀번호를 입력해 주세요."
          className={inputStyle(isValid)}
          name={inputName}
          onKeyDown={handlePressEnter}
          onChange={handleChangeInput}
          autoComplete="new-password"
        />

        {isEnteredVal && (
          <>
            <button
              type="button"
              className="absolute right-0 top-[2.7rem] mr-10 text-sub-2"
              onClick={() => handleShowPwd(inputRef)}
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
              onClick={handleDeleteInputVal}
            >
              <svg className="size-3 fill-current text-gray-200">
                <use href="/assets/sprite-sheet.svg#x" />
              </svg>
            </button>
          </>
        )}
        {!isValid && isEnteredVal && (
          <p role="alert" className="text-xs font-normal text-errored">
            8~15자의 영문, 숫자, 특수문자(~!@#$%^&*)를 조합해 사용해주세요.
          </p>
        )}
      </div>
    </>
  );
};

export default PwdInput;
