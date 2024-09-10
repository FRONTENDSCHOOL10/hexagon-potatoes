import React, { useState } from 'react';
import CheckList from './CheckList';

const AgreeTo = () => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const handleAllCheckedChange = (isChecked: boolean) => {
    setIsAllChecked(isChecked);
  };

  const terms = [
    { id: 'term1', text: '만 14세 이상입니다. (필수)' },
    { id: 'term2', text: '이용약관 (필수)' },
    { id: 'term3', text: '개인정보수집 및 이용동의 (필수)' },
    { id: 'term4', text: '알림 메일 및 SMS 수신 (선택)' },
  ];

  return (
    <div className="gap-1">
      <h1 className="text-[.875rem] text-sm">약관 동의</h1>
      <CheckList items={terms} onAllCheckedChange={handleAllCheckedChange} />
      {/* <p>전체 동의 여부: {isAllChecked ? '동의 완료' : '미동의'}</p> */}
    </div>
  );
};

export default AgreeTo;
