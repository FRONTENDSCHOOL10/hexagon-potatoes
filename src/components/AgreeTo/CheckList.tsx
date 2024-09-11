import React, { ChangeEvent, useState } from 'react';

interface CheckListProps {
  items: { id: string; text: string }[];
  onCheckChange: (checkedItems: string[]) => void;
  onAllCheckedChange: (allChecked: boolean) => void;
}

const CheckList: React.FC<CheckListProps> = ({
  items,
  onCheckChange,
  onAllCheckedChange,
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const itemId = event.target.value;
    const isChecked = event.target.checked;

    const updatedCheckedItems = isChecked
      ? [...checkedItems, itemId]
      : checkedItems.filter((id) => id !== itemId);

    setCheckedItems(updatedCheckedItems);
    onCheckChange(updatedCheckedItems);

    setIsAllChecked(updatedCheckedItems.length === items.length);
  };

  const handleAllCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const allCheckedItems = isChecked ? items.map((item) => item.id) : [];

    setCheckedItems(allCheckedItems);
    onCheckChange(allCheckedItems);
    setIsAllChecked(isChecked);
    onAllCheckedChange(isChecked);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isAllChecked}
          onChange={handleAllCheckChange}
          id="all-agree"
        />
        <label htmlFor="all-agree" className="text-sm font-medium">
          모두 동의
        </label>
      </div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            value={item.id}
            checked={checkedItems.includes(item.id)}
            onChange={handleChange}
            id={item.id}
          />
          <label htmlFor={item.id} className="text-sm">
            {item.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckList;
