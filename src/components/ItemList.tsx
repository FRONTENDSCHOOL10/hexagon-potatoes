// 데이터 가져오기

import Items from './Items';
const ItemsList = () => {
  return (
    <ul>
      <li>
        {/* 가져온 데이터 전달 */}
        <Items props={} />
      </li>
    </ul>
  );
};

export default ItemsList;
