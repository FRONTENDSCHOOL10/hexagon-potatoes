interface propsType {
  buttonContent: string;
  imgSrc: string;
  imgAlt: string;
  pageUrl: string;
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectCountryButton = ({
  imgSrc = 'shipmatelogo.png',
  imgAlt,
  buttonContent,
  pageUrl,
}: propsType) => {
  const navigate = useNavigate();
  // const [pageUrl, setPageUrl] = useState();

  const handleClick = () => {
    if (pageUrl === 'nowwedeveloping') {
      navigate(`/home/nowwedeveloping`);
    } else {
      navigate(`/home/partylist/${pageUrl}`);
    }
  };

  const countryImg = (country: string) => {
    switch (country) {
      case '미국':
        return `/assets/country/american-flag.png`;
      case '중국':
        return `/assets/country/china-flag.png`;
      case '일본':
        return `/assets/country/japan-flag.png`;
      default:
        return `/assets/shipmatelogo.png`;
    }
  };

  // imgAlt 를 상위 컴포넌트에서 전달받을지 파일명을 잘라서 사용할지 고민.
  // 파일명에서 잘라쓰는 로직
  // const imgAlt = (imgSrc: string): string => {
  //   const fileName = imgSrc.split('.')[0];
  //   return fileName;
  // };

  return (
    <button
      type="button"
      className={`inline-block w-40 rounded-full bg-white p-3 text-start text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white`}
      onClick={handleClick}
    >
      <img
        className="mr-2 inline-block h-7 w-7 rounded-full border object-cover"
        src={countryImg(buttonContent)}
        alt={`${imgAlt} 선택 버튼 아이콘`}
      />
      {buttonContent}
    </button>
  );
};
export default SelectCountryButton;
