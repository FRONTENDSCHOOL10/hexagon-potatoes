import formatCurrency from '@/utils/currencyFormat';
import PartyInfo from './PartyInfo';

interface PropsType {
  country: string;
  customs_limit: string;
  current_members: string;
  dutiesLimit: string;
  weight: string;
}

//props로 파티 데이터 받아오기

const PartyInfoList = ({
  country,
  customs_limit,
  dutiesLimit,
  current_members,
  weight,
}: PropsType): JSX.Element => {
  return (
    <ul className="border-y-2 border-black">
      <PartyInfo title="공구 진행 국가">{country}</PartyInfo>
      <PartyInfo title="모집인원">
        {current_members} / {customs_limit}
      </PartyInfo>
      <PartyInfo title="관세 한도 달성률">{dutiesLimit}%</PartyInfo>
      <PartyInfo title="무게 한도(인당)">{String(weight)}g</PartyInfo>
    </ul>
  );
};

export default PartyInfoList;
