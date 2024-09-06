import React from 'react';
import SavingMoneyCard from '../components/SavingMoneyCard/SavingMoneyCard';
const MyPage = () => {
  const nickname = "사용자";
  // db에서 받아와야함

  return (
    <div className="grid place-items-center gap-[1.25rem]">
      {/* <h1>마이페이지</h1> */}
      <SavingMoneyCard nickname={nickname}/>
    </div>
  );
};

export default MyPage;
