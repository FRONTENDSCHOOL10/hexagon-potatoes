interface propsType{
  buttonContent: string;
  // blob 일수도!!
  imgSrc: string;
  imgAlt: string;
  size: string;
}


const SelectCountryButton = ({ imgSrc, imgAlt, buttonContent="", size }:propsType) => {  
    return (
      <button className="">
        <img width={size} src={imgSrc} alt={imgAlt} className="" />
        {buttonContent}
      </button>
    )
  }
export default SelectCountryButton;