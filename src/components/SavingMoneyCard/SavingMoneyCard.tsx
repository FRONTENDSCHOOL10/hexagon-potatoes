interface SavingMoneyCard {
    nickname: string;
    money: number;
}
  
  const SavingMoneyCard = ({nickname
  }: SavingMoneyCard) => {
    const money = 35000; // 금액 하드코딩

    return (
      <div className="bg-white shadow-shadow-blue p-4 rounded-lg overflow-hidden font-['Pretendard'] border-radius-[0.75rem] p-[0.75rem] gap-[0.375rem] w-[21rem] h-[5.1rem]">
      <div className="">
        <h3 className="text-button text-gray-600 text-black">
          {nickname}닉네임 님은 쉽메이트를 통해
        </h3>
        <p className="text-gray-200 text-sub-1">
          <span className="text-mainblue text-h2 font-[600]">{money.toLocaleString()}원</span> 아꼈어요
        </p>
      </div>
    </div>
    
      );

  };
  
  export default SavingMoneyCard;
  