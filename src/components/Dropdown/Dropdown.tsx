interface PropTypes {
  label: string;
  defaultMsg: string;
  dropdownName: string;
  list: (string | { name: string; items: string[] })[];
  onInputChange: (name: string) => (value: string | number) => void;
}

import { useId } from 'react';

const Dropdown = ({
  dropdownName,
  list,
  label,
  defaultMsg,
  onInputChange,
}: PropTypes) => {
  const dropdownId = useId();
  // 아이콘을 위한 스타일
  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
        '<g transform="rotate(270 12 12)">' +
        '<path fill="%23000000" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>' +
        '</g></svg>'
    )}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '20px 20px',
    paddingRight: '40px',
    paddingLeft: '20px',
    textAlign: 'left',
  };

  const handleDropdownVal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputVal = e.target.value;
    onInputChange(dropdownName)(inputVal);
  };

  return (
    <div role="group" aria-label="카테고리 선택 필드">
      <label className="block text-button" htmlFor={dropdownId}>
        {label}
      </label>

      <select
        className="w-full appearance-none rounded-xl border border-gray-200 py-2 pl-5 text-sub-2 outline-1 outline-mainblue"
        style={selectStyle}
        onChange={handleDropdownVal}
        name={dropdownName}
        id={dropdownId}
      >
        <option value="choice" className="">
          {defaultMsg}
        </option>
        {list.map((data) =>
          typeof data === 'string' ? (
            <option key={data} value={data}>
              {data}
            </option>
          ) : (
            <optgroup
              className="text-base text-button text-mainblue"
              key={data.name}
              label={data.name}
            >
              {data.items.map((list) => (
                <option
                  className="text-sub-2 text-black"
                  key={list}
                  value={list}
                >
                  {list}
                </option>
              ))}
            </optgroup>
          )
        )}
      </select>
    </div>
  );
};

export default Dropdown;
