interface propsType{
  buttonType: string;
  buttonContent: string;
  isActive: boolean;
  // blob 일수도!!
  imgSrc: string;
  imgAlt: string;
  size: string;
}

const Button = ({ imgSrc, imgAlt, buttonType, buttonContent="", isActive = true, size }:propsType) => {
  // 해당 isActive state는 상위에서 전달해야 할 것 같음.
  
  // 버튼에 이미지가 들어갈 경우
  if (buttonType === "image") {
    return (
      // 툴팁을 보여주기 위해 mouseEnter 함수 참조
      <button onMouseEnter={ } className="" >
        {/* 이미지 src와 alt를 props로 받습니다. */}
        <img width={size} src={imgSrc} alt={imgAlt} className="" />
      </button>
    )
  }
  // 이미지가 들어가지 않은 일반 버튼일 경우
  return (
    <button disabled={!isActive} className={isActive ? "" : ""}>{buttonContent}</button>
  )
}

export default Button;