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

  // imgAlt 를 상위 컴포넌트에서 전달받을지 파일명을 잘라서 사용할지 고민.
  // 파일명에서 잘라쓰는 로직
  // const imgAlt = (imgSrc: string): string => {
  //   const fileName = imgSrc.split('.')[0];
  //   return fileName;
  // };

  return (
    <button
      type="button"
      className={`text-button shadow-shadow-blue hover:bg-mainblue inline-block w-40 rounded-full bg-white p-3 text-start text-black hover:text-white`}
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
