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
  itemImgAlt,
  item_name,
  itemCategory,
  item_weight,
  item_size
}: propsType) => {
  return (
    <li>
      <h3>{name}</h3>
      <img src={item_photo } alt={itemImgAlt} />
      <p aria-label="물품 이름 및 카테고리">
        {item_name} / {itemCategory}
      </p>
      {/* if(만약 파티장이라면) */}
      {/* return <p aria-label="주소">{memberAddress}</p> */}
      <p aria-label="물품 무게">{item_weight}</p>
      <p aria-label="물품 크기">{item_size}</p>
    </li>
  );
};

export default Items;
