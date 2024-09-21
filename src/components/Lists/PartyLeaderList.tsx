// 데이터 가져오기

import PartyLeader from './PartyLeader';
const PartyLeaderList = ({ data }) => {
  return (
    // 헤딩 아이디랑 ul을 aria-labelledby 연결하고 싶음.
    <ul>
      {/* 가져온 데이터 전달 */}
      {data.map((d) => (
        <PartyLeader key={} item={data} />
      ))}
    </ul>
  );
};

export default PartyLeaderList;
