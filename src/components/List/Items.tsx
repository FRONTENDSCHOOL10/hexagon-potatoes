// 데이터 가져오기
interface propsType {
  name: string;
  // blob 객체??
  item_photo : string;
  itemImgAlt: string;
  item_name: string;
  itemCategory: string;
  item_weight: string;
  item_size: string;
}

const Items = ({
  name,
  item_photo ,
  item_name,
  itemCategory,
  item_weight,
  item_size
}: propsType) => {
  
  return (
    <li>
      <img src={item_photo } alt={item_name} />
      <span aria-label="주문자명">{name}</span>
      <span aria-label="물품 이름 및 카테고리">
        {item_name} / {itemCategory}
      </span>
      {/* if(만약 파티장이라면) */}
      {/* return <p aria-label="주소">{memberAddress}</p> */}
      <span aria-label="물품 무게">{item_weight}</span>
      <span aria-label="물품 크기">{item_size}</span>
    </li>
  );
};

export default Items;
