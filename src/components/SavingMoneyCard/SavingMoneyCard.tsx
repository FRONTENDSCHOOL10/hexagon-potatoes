import { useEffect, useState } from 'react';

interface SavingMoneyCardProps {
  nickname: string;
}

const SavingMoneyCard = ({ nickname }: SavingMoneyCardProps) => {
  const [money, setMoney] = useState<number>(0);

  useEffect(() => {
    const storedMoney = localStorage.getItem('user_money');

    if (storedMoney) {
      setMoney(Number(storedMoney));
    } else {
      const randomMoney = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
      setMoney(randomMoney);
      localStorage.setItem('user_money', randomMoney.toString());
    }
  }, []);

  return (
    <div className="bg-white shadow-shadow-blue p-4 rounded-lg overflow-hidden font-['Pretendard'] w-[21rem] h-[5.1rem]">
      <div>
        <h3 className="text-button text-gray-600 text-black">
          {nickname} 님은 쉽메이트를 통해
        </h3>
        <p className="text-gray-200 text-sub-1">
          <span className="text-mainblue text-h2 font-[600]">{money.toLocaleString()}원</span> 아꼈어요
        </p>
      </div>
    </div>
  );
};

export default SavingMoneyCard;
