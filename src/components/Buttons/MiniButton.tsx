import { Link } from 'react-router-dom';

interface propsType {
  buttonContent: string;
  isActive: boolean;
  onClick?: () => void;
  link?: string;
}
const MiniButton = ({
  onClick,
  buttonContent,
  isActive = true,
  link,
}: propsType) => {
  return link ? (
    <Link
      to={link}
      className={`absolute right-[0] top-2/4 flex w-[5.75rem] -translate-y-1/2 transform justify-center rounded-full ${isActive ? 'bg-white' : 'bg-gray-200'} px-3 py-2.5 text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white focus:bg-mainblue focus:text-white`}
      onClick={onClick}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      disabled={!isActive}
      className={`absolute right-[0] top-2/4 flex w-[5.75rem] -translate-y-1/2 transform justify-center rounded-full ${isActive ? 'bg-white' : 'bg-gray-200'} px-3 py-2.5 text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white focus:bg-mainblue focus:text-white`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default MiniButton;
