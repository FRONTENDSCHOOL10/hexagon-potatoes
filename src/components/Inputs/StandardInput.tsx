interface PropsType {
  inputName: string;
  defaultValue: string;
  onInputChange: (val: string) => void;
}

import { useState, useId } from 'react';

const StandardInput = ({
  inputName,
  defaultValue,
  onInputChange,
}: PropsType) => {
  const [inputVal, setInputVal] = useState('');
  const inputId = useId();

  const inputStyle =
    'text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-mainblue';

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    onInputChange(inputVal);
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
      className="flex flex-col gap-y-1"
    >
      <label className="text-sub-2" htmlFor={inputId}>
        휴대폰 번호
      </label>
      <input
        id={inputId}
        type="tel"
        value={inputVal}
        placeholder="휴대폰 번호를 입력해 주세요."
        defaultValue={defaultValue}
        className={inputStyle}
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default StandardInput;
