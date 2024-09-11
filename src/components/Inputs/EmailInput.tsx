import { useState, useId } from 'react';
import { validateEmail } from '@/utils/validate';

interface PropsType {
  inputName: string;
  defaultValue?: string;
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

const EmailInput = ({
  onEmailChange,
  onValidChange,
  inputName,
  defaultValue,
}: PropsType) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [emailList, setEmailList] = useState(FrequencyEmails);
  const [isDropBox, setIsDropBox] = useState(false);
  const [selected, setSelected] = useState(-1);
  const inputId = useId();

  const inputStyle = `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${
    isValid || !isEnteredVal ? 'outline-mainblue' : 'outline-errored'
  }`;

  const validateMessage = isValid
    ? '사용할 수 있는 이메일 입니다.'
    : '올바른 이메일 형식이 아닙니다.';

  const validateInputVal = (val: string) => {
    const valid = validateEmail(val);
    setIsValid(valid);
    onValidChange(valid);
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
    setInputVal(`${inputVal.split('@')[0]}${domain}`);
    setIsDropBox(false);
    setSelected(-1);
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
        className={inputStyle}
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
