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
      className={`absolute right-[0] top-2/4 flex w-[5.75rem] -translate-y-1/2 transform justify-center rounded-full bg-white px-3 py-2.5 text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white focus:bg-mainblue focus:text-white`}
      onClick={onClick}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      className={`'bg-white' absolute right-[0] top-2/4 flex w-[5.75rem] -translate-y-1/2 transform justify-center rounded-full px-3 py-2.5 text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white focus:bg-mainblue focus:text-white`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default MiniButton;
