interface propsType {
  inputName: string;
}

import { useId } from "react";

const AddressInput = ({ inputName }: propsType) => {
  const inputId = useId();
  const inputStyle = 'px-5 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-mainblue'
  
  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };
  
  return (
    <div role='group' aria-label="주소 입력 필드" className="flex flex-col gap-y-1">
      <label htmlFor={inputId}>주소*</label>
      {/* 클릭시 주소 api 발생하게 */}
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="주소를 입력해 주세요."
        name={inputName}
        className={inputStyle}
        required
      />
      
      <label htmlFor={inputId} className="mt-2">상세 주소(옵션)</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="상세 주소를 입력해 주세요."
        name={inputName}
        className={inputStyle}
        onKeyDown={handlePressEnter}
        />
    </div>
  );
};

export default AddressInput;
