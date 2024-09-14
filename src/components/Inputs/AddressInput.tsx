import { useState, useId } from 'react';

interface PropTypes {
  addressInputName: string;
  detailAddressInputName: string;
  defaultAddressVal: string;
  defaultDetailAddressVal: string;
  onAddressChange: (name: string) => (val: string | number) => void;
}

import { useState, useId } from 'react';
import ModalLayout from '@/layout/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const Postcode = ({ isOpen, onInputChange, onTogglePostPopup }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    onInputChange(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onTogglePostPopup}>
      <DaumPostcodeEmbed
        onComplete={handleComplete}
        onClose={onTogglePostPopup}
      />
    </ModalLayout>
  );
};

export { Postcode };

const AddressInput = ({
  addressInputName,
  detailAddressInputName,
  defaultAddressVal,
  defaultDetailAddressVal,
  onAddressChange,
}: PropTypes) => {
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [addressInputVal, setAddressInputVal] = useState('');
  const [detailAddressInputVal, setDetailAddressInputVal] = useState('');

  const addressInputId = useId();
  const detailAddressInputId = useId();

  const inputStyle =
    'text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-mainblue';

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleTogglePostPopup = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setAddressInputVal(inputVal);
    checkInputFilled(inputVal);
    onAddressChange(addressInputName)(inputVal);
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputVal = e.target.value;
    setDetailAddressInputVal(inputVal);
    checkInputFilled(inputVal);
    onAddressChange(detailAddressInputName)(inputVal);
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
      <label className="text-button" htmlFor={addressInputId}>
        주소
      </label>
      <input
        value={addressInputVal}
        id={addressInputId}
        type="text"
        defaultValue={defaultAddressVal}
        placeholder="주소를 입력해 주세요."
        name={addressInputName}
        className={inputStyle}
        onChange={handleAddressChange}
        onClick={handleTogglePostPopup}
        required
        readOnly
      />
      <label className="mt-2 text-button" htmlFor={detailAddressInputId}>
        상세 주소(선택)
      </label>
      <input
        id={detailAddressInputId}
        type="text"
        value={detailAddressInputVal}
        defaultValue={defaultDetailAddressVal}
        placeholder="상세 주소를 입력해 주세요."
        name={detailAddressInputName}
        className={inputStyle}
        onKeyDown={handlePressEnter}
        onChange={handleDetailAddressChange}
      />
      <Postcode
        isOpen={isOpen}
        onTogglePostPopup={handleTogglePostPopup}
        onInputChange={setAddressInputVal}
      />
    </div>
  );
};

export default AddressInput;
