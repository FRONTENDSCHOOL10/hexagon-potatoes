interface propsType {
  inputName: string;
  onPwdChange: (val: string) => void;
}
import { useRef, useState, useId } from 'react';
import { validatePwd } from '@/utils/validate';

const PwdInput = ({ inputName, onPwdChange }: propsType) => {
  const [isValid, setIsValid] = useState(true);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  const pwdInputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid ? 'outline-mainblue' : 'outline-errored'}`;

  const validateInputVal = (val: string) => {
    setIsValid(validatePwd(val));
  };

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    validateInputVal(inputVal);
    checkInputFilled(inputVal);
    onPwdChange(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
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
        <label className="text-sub-2" htmlFor={pwdInputId}>
          비밀번호
        </label>
        <input
          ref={inputRef}
          value={inputVal}
          id={pwdInputId}
          type="password"
          defaultValue=""
          placeholder="비밀번호를 입력해 주세요."
          className={inputStyle(isValid)}
          name={inputName}
          onKeyDown={handlePressEnter}
          onChange={handleChangeInput}
        />

        {isEnteredVal && (
          <>
            <button
              className="absolute right-0 top-[48px] mr-10 text-sub-2"
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
              className="absolute right-0 top-[49px] mr-5 text-sub-2"
              onClick={handleDeleteInputVal}
            >
              <svg className="size-3 fill-current text-gray-200">
                <use href="/assets/sprite-sheet.svg#x" />
              </svg>
            </button>
          </>
        )}
        {!isValid && isEnteredVal && (
          <p className="text-xs font-normal text-errored">
            올바른 비밀번호가 아닙니다.
          </p>
        )}
      </div>
    </>
  );
};

export default PwdInput;
