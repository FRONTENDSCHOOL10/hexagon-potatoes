import { Link } from 'react-router-dom';

interface propsType {
  buttonContent: string;
  onClick?: () => void;
  link?: string;
}
const MiniButton = ({ onClick, buttonContent, link }: propsType) => {
  return link ? (
    <Link
      to={link}
      className={`flex w-[5.75rem] justify-center whitespace-nowrap rounded-full bg-white px-3 py-2.5 text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white focus:bg-mainblue focus:text-white`}
      onClick={onClick}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      className={`flex w-[5.75rem] justify-center whitespace-nowrap rounded-full bg-white px-3 py-2.5 text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white focus:bg-mainblue focus:text-white`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default MiniButton;
