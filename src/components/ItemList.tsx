// 데이터 가져오기

import Items from './Items';
const ItemsList = () => {
  return (
    <ul>
        {/* 가져온 데이터 전달 */}
        <Items props={} />
    </ul>
  );
};

export default ItemsList;
