
import React, { useState } from 'react';
import MiniButton from '@/components/Buttons/MiniButton';
import MyprofileFollwer from '@/components/MyprofileFollower/MyprofileFollower';

const MyPage = () => {
  const [activeButton, setActiveButton] = useState('파티장');
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold">마이페이지</h1>

      <div className="flex gap-4">
        <MiniButton
          buttonContent="파티장"
          onClick={() => handleButtonClick('파티장')}
          link="#"
        />
        <MiniButton
          buttonContent="파티원"
          onClick={() => handleButtonClick('파티원')}
          link="#"
        />
      </div>

      <div className="mt-6">
        {activeButton === '파티장' && (
          <div>
            <MyprofileFollwer/>
          </div>
        )}

        {activeButton === '파티원' && (
          <div>
            <h2>파티원 페이지 내용</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
