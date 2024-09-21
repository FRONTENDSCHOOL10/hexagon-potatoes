import { useState, useId } from 'react';
import { validateEmail } from '@/utils/validate';
import checkDuplicate from '@/utils/checkDuplicate';

interface PropTypes {
  inputName: string;
  onEmailChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
}

const FrequencyEmails = [
  '@naver.com',
  '@gmail.com',
  '@daum.net',
  '@hanmail.net',
  '@yahoo.com',
  '@outlook.com',
  '@nate.com',
  '@kakao.com',
];

const EmailInput = ({ onEmailChange, onValidChange, inputName }: PropTypes) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [emailList, setEmailList] = useState(FrequencyEmails);
  const [isDropBox, setIsDropBox] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [isDuplicate, setIsDuplicate] = useState(true);
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 px-5 py-2 h-[2.8125rem] relative pl-5 pr-16 py-2 rounded-xl w-full border outline-1 ${(isValid && isDuplicate) || !isEnteredVal ? 'outline-mainblue border-gray-200' : 'outline-errored border-errored'}`;

  const validationMessage = () => {
    if (!isEnteredVal) return '';
    if (!isValid) return '이메일 양식을 지켜 입력해주세요.';
    if (!isDuplicate) return '이미 사용중인 이메일입니다.';
  };

  const validateInputVal = async (val: string) => {
    const isValidInput = validateEmail(val);
    const isDuplicate = await checkDuplicate('user_email', val);
    setIsValid(isValidInput);
    setIsDuplicate(isDuplicate);
    onValidChange(isValidInput && isDuplicate);
  };

  const checkInputFilled = (val: string) => {
    setIsEnteredVal(val.trim() !== '');
  };

  const updateEmailList = (val: string) => {
    if (val.includes('@')) {
      setIsDropBox(true);
      setEmailList(
        FrequencyEmails.filter((email) => email.includes(val.split('@')[1]))
      );
    } else {
      setIsDropBox(false);
    }
  };

  const handleDropDownClick = (domain: string) => {
    const updatedInputVal = `${inputVal.split('@')[0]}${domain}`;
    setInputVal(updatedInputVal);
    setIsDropBox(false);
    setSelected(-1);
    validateInputVal(updatedInputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelected((prev) =>
          isDropBox && prev < emailList.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelected((prev) => (isDropBox && prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (selected >= 0) {
          handleDropDownClick(emailList[selected]);
        }
        break;
      case 'Tab':
        setIsDropBox(false);
        break;
      default:
        break;
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputVal(newVal);
    validateInputVal(newVal);
    checkInputFilled(newVal);
    onEmailChange(inputName)(newVal);
    updateEmailList(newVal);
  };

  return (
    <div
      role="group"
      aria-label="이메일 입력 필드"
      className="relative flex flex-col gap-y-1"
    >
      <label className="text-button" htmlFor={inputId}>
        이메일
      </label>
      <p className="absolute right-0 top-1 text-sub-2 text-mainblue">
        @을 포함한 이메일 양식
      </p>
      <input
        id={inputId}
        value={inputVal}
        type="email"
        className={inputStyle(isValid)}
        placeholder="이메일을 입력해 주세요."
        name={inputName}
        onKeyDown={handleKeyDown}
        onChange={handleChangeInput}
        required
      />
      {isDropBox && (
        <ul
          className="rounded border ps-4 text-body-1"
          role="listbox"
          aria-activedescendant={selected >= 0 ? `${selected}` : undefined}
        >
          {emailList.map((item, idx) => (
            <li
              key={idx}
              id={`${inputId}-item-${idx}`}
              role="option"
              aria-selected={selected === idx}
              onMouseOver={() => setSelected(idx)}
              onClick={() => handleDropDownClick(item)}
              className={`flex justify-stretch p-1 ${selected === idx ? 'bg-gray-100' : ''}`}
            >
              {inputVal.split('@')[0]}
              {item}
            </li>
          ))}
        </ul>
      )}
      {isEnteredVal && (
        <p role="alert" className="text-xs font-normal text-errored">
          {validationMessage()}
        </p>
      )}
    </div>
  );
};

export default EmailInput;
