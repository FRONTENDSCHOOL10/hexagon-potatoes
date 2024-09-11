// 데이터 가져오기
interface propsType {
  nickname: string;
  // blob 객체??
  item_photo: string;
  itemImgAlt: string;
  item_name: string;
  itemCategory: string;
  item_weight: string;
  item_size: string;
}

const Item = ({
  nickname,
  item_photo,
  item_name,
  itemCategory,
  item_weight,
  item_size,
}: propsType) => {
  return (
    <li className="flex list-none flex-row items-center gap-3 border-b border-b-gray-100 p-2 leading-normal">
      <img src={item_photo} alt={item_name} className="size-20" />
      <div className="flex flex-col" aria-label="주문 물품 상세" role="group">
        <span aria-label="주문자명" className="text-sub-1">
          {nickname}
        </span>
        <span aria-label="물품 이름 및 카테고리" className="text-sub-2">
          {item_name} / {itemCategory}
        </span>
        {/* if(만약 파티장이라면) */}
        {/* return <p aria-label="주소">{memberAddress}</p> */}
        <span aria-label="물품 무게" className="text-sub-2">
          {item_weight}
        </span>
        <span aria-label="물품 크기" className="text-sub-2">
          {item_size}
        </span>
      </div>
    </li>
  );
};

export default Item;
