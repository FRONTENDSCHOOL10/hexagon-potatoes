// 데이터 가져오기

const Items = () => {
  return (
    <>
      <h3>{memberName}</h3>
      <img src={itemImg} alt={itemImgAlt} />
      <p aria-label="물품 이름 및 카테고리">
        {itemName} / {itemCategory}
      </p>
      {/* if(만약 파티장이라면) */}
      {/* return <p aria-label="주소">{memberAddress}</p> */}
      <p aria-label="물품 무게">{itemWeight}</p>
      <p aria-label="물품 크기">{itemSize}</p>
    </>
  );
};

export default Items;
