import React from 'react';
import CheckList from './CheckList';

interface AgreeToProps {
  isAllChecked: boolean;
  onAllCheckedChange: (allChecked: boolean) => void;
}

const AgreeTo: React.FC<AgreeToProps> = ({
  isAllChecked,
  onAllCheckedChange,
}) => {
  const terms = [
    { id: 'term1', text: '만 14세 이상입니다. (필수)' },
    { id: 'term2', text: '이용약관 (필수)' },
    { id: 'term3', text: '개인정보수집 및 이용동의 (필수)' },
    { id: 'term4', text: '알림 메일 및 SMS 수신 (선택)' },
  ];

  return (
    <div className="flex flex-col gap-2 border-t border-gray-200 p-4">
      <h1 className="mb-2 text-lg font-semibold">약관 동의</h1>
      <CheckList
        items={terms}
        onCheckChange={(checkedItems) => {
          const allRequiredChecked = terms
            .filter((term) => term.text.includes('(필수)'))
            .every((term) => checkedItems.includes(term.id));
          onAllCheckedChange(allRequiredChecked);
        }}
        onAllCheckedChange={onAllCheckedChange}
      />
    </div>
  );
};

export default AgreeTo;
