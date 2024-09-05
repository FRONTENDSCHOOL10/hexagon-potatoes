interface SavingMoneyCard {
    nickname: string;
    money: number;
}
  
  const SavingMoneyCard = ({nickname
  }: SavingMoneyCard) => {
    const money = 35000; // 금액을 하드코딩

    return (
        <div className="bg-white shadow-shadow-blue p-4 rounded-lg overflow-hidden">
          <div className="">
            <h3 className="font-semibold text-gray-800">
              {nickname}닉네임 님은 쉽메이트를 통해
            </h3>
            <p className="text-gray-300 text-sub-1">
              <span className="text-mainblue text-h2">{money.toLocaleString()}원</span> 아꼈어요
            </p>
          </div>
        </div>
      );

  };
  
  export default SavingMoneyCard;
  