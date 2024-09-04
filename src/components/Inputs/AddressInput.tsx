interface propsType {
  labelFor: string;
  inputId: string;
  inputName: string;
}

const AddressInput = ({ labelFor, inputId, inputName }: propsType) => {
  return (
    <>
      <label htmlFor={labelFor}>주소</label>
      {/* 클릭시 주소 api 발생하게 */}
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="주소를 입력해 주세요."
        name={inputName}
      />
      <label htmlFor={labelFor}>상세 주소(옵션)</label>
      <input
        id={inputId}
        type="text"
        defaultValue=""
        placeholder="상세 주소를 입력해 주세요."
        name={inputName}
      />
    </>
  );
};

export default AddressInput;
