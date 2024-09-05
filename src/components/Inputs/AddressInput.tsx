interface propsType {
  inputName: string;
}

import { useId } from "react";

const AddressInput = ({ inputName }: propsType) => {
  const inputId = useId();
  return (
    <div role='group'>
      <label htmlFor={inputId}>주소</label>
      {/* 클릭시 주소 api 발생하게 */}
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="주소를 입력해 주세요."
        name={inputName}
      />
      <label htmlFor={inputId}>상세 주소(옵션)</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="상세 주소를 입력해 주세요."
        name={inputName}
      />
    </div>
  );
};

export default AddressInput;
