// 데이터 가져오기
import Item from './Item';
const ItemsList = () => {
  return (
    // 헤딩 아이디랑 ul을 aria-labelledby 연결하고 싶음.

    <ul>
      {/* 가져온 데이터 전달 */}
      {data.map((d) => (
        <Item key={} props={} />
      ))}
    </ul>
  );
};

export default ItemsList;
