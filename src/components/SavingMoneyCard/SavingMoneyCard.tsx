interface SavingMoneyCard {
    nickname: string;
    money: number;
}
  
  const SavingMoneyCard = ({nickname
  }: SavingMoneyCard) => {
    const money = 35000; // 금액을 하드코딩

    return (
        <div className="">
          <div className="">
            <h3 className="">
              {nickname}님은 쉽메이트를 통해
            </h3>
            <p className="">
              <span className="">{money.toLocaleString()}</span>원 아꼈어요
            </p>
          </div>
        </div>
      );

  };
  
  export default SavingMoneyCard;
  