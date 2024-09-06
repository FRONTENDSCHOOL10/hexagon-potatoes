interface propsType {
  buttonContent: string;
  imgSrc: string;
  imgAlt: string;
  pageUrl: string;
}

import { useNavigate } from 'react-router-dom';

const SelectCountryButton = ({
  imgSrc = 'shipmatelogo.png',
  imgAlt,
  buttonContent,
  pageUrl,
}: propsType) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${pageUrl}`);
  };

  // const imgAlt = (imgSrc: string): string => {
  //   const fileName = imgSrc.split('.')[0];
  //   return fileName;
  // };

  return (
    <button
      className={`inline-block w-40 rounded-full bg-white p-3 text-start text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white`}
      onClick={handleClick}
    >
      <img
        className="inline-block w-8"
        src={`/assets/${imgSrc}`}
        alt={`${imgAlt} 선택 버튼 아이콘`}
      />
      {buttonContent}
    </button>
  );
};
export default SelectCountryButton;
