// 데이터 가져오기
import Standard from './Standard';

const data = [
  {
    title: '임시 제목',
    description: '임시 설명',
  },
];

const StandardList = ({ data }) => {
  // 헤딩 아이디랑 ul을 aria-labelledby 연결하고 싶음.
  return (
    <ul>
      {/* 가져온 데이터 전달 */}
      {/* 기본 리스트로, title과 description만 받습니다. */}
      {data.map((d, idx) => (
        <Standard key={idx} title={d.title} description={d.description} />
      ))}
    </ul>
  );
};

export default StandardList;
