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
        className="w-full rounded-xl border border-gray-200 py-2 pl-5 pr-5 text-sub-2 outline-1 outline-mainblue"
        onChange={handleDropdownVal}
        name={dropdownName}
        id={dropdownId}
      >
        <option value="choice">{defaultMsg}</option>
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
