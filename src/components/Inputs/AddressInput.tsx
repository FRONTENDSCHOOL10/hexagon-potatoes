import { useState, useId } from 'react';

interface propsType {
  inputName: string;
  defaultAddressVal: string;
  defaultOptionalAddressVal: string;
  onAddressChange: (val: string) => void;
}

const AddressInput = ({
  inputName,
  defaultAddressVal,
  defaultOptionalAddressVal,
  onAddressChange,
}: propsType) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const addressInputId = useId();
  const optionalAddressInputId = useId();

  const inputStyle =
    'text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-mainblue';

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    checkInputFilled(inputVal);
    onAddressChange(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div
      role="group"
      aria-label="주소 입력 필드"
      className="flex flex-col gap-y-1"
    >
      <label className="text-sub-2" htmlFor={addressInputId}>
        주소*
      </label>
      <input
        id={addressInputId}
        type="text"
        defaultValue={defaultAddressVal}
        placeholder="주소를 입력해 주세요."
        name={inputName}
        className={inputStyle}
        onChange={handleChangeInput}
        //  클릭시 주소 api 발생하게
        // onClick={ }
        required
      />

      <label className="mt-2 text-sub-2" htmlFor={optionalAddressInputId}>
        상세 주소(옵션)
      </label>
      <input
        id={optionalAddressInputId}
        type="text"
        defaultValue={defaultOptionalAddressVal}
        placeholder="상세 주소를 입력해 주세요."
        name={inputName}
        className={inputStyle}
        onKeyDown={handlePressEnter}
      />
    </div>
  );
};

export default AddressInput;
