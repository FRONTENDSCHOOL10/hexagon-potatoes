import React, { useState, useEffect } from 'react';

interface CheckListProps {
  items: { id: string; text: string }[];
  onAllCheckedChange: (isAllChecked: boolean) => void;
}

const CheckList: React.FC<CheckListProps> = ({ items, onAllCheckedChange }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  // 모든 항목이 체크된 상태인지 확인
  useEffect(() => {
    const allChecked = checkedItems.length === items.length;
    onAllCheckedChange(allChecked);
  }, [checkedItems, items.length, onAllCheckedChange]);

  // "모두 동의합니다" 체크박스 상태 변경
  const handleSelectAllChange = () => {
    if (selectAllChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(items.map((item) => item.id));
    }
    setSelectAllChecked(!selectAllChecked);
  };

  // 개별 체크박스 상태 변경
  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 체크박스 아이콘 컴포넌트
  const CheckBoxIcon = ({ checked }: { checked: boolean }) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      fill="none"
      className="mr-1"
    >
      <use
        href={`/assets/sprite-sheet.svg#${checked ? 'checked' : 'unchecked'}`}
      />
    </svg>
  );

  return (
    <div className="p-3">
      {/* 모두 동의합니다 체크박스 */}
      <div className="flex items-center pb-[.0625rem]">
        <input
          type="checkbox"
          id="selectAll"
          checked={selectAllChecked}
          onChange={handleSelectAllChange}
          className="hidden"
        />
        <label
          htmlFor="selectAll"
          className="flex cursor-pointer items-center font-body-1 text-[1rem] font-normal"
        >
          <CheckBoxIcon checked={selectAllChecked} />
          모두 동의합니다
        </label>
      </div>
      {/* 개별 항목 체크박스 */}
      <ul className="list-inside list-disc">
        {items.map((item) => (
          <li key={item.id} className="flex items-center pb-[.0625rem]">
            <input
              type="checkbox"
              id={item.id}
              checked={checkedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
              className="hidden"
            />
            <label
              htmlFor={item.id}
              className="flex cursor-pointer items-center font-body-2 text-[.875rem] font-light"
            >
              <CheckBoxIcon checked={checkedItems.includes(item.id)} />
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckList;
