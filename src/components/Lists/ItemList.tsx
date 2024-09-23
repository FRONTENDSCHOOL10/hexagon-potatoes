// 데이터 가져오기
import Item from './Item';
const ItemsList = ({ data }) => {
  return (
    <ul>
      {data.map((d, idx) => (
        <Item key={idx} data={d} />
      ))}
    </ul>
  );
};

export default ItemsList;
