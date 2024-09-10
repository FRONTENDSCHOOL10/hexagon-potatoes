interface propsType {
  type: 'button' | 'submit';
  buttonContent: string;
  isActive: boolean;
  onClick: () => void;
}
const Button = ({
  type = 'button',
  onClick,
  buttonContent,
  isActive = true,
}: propsType) => {
  return (
    <button
      type={type}
      disabled={!isActive}
      className={`inline-block w-full rounded-full ${isActive ? 'hover:bg-mainblue bg-white hover:text-white' : 'bg-gray-200'} text-button shadow-shadow-blue px-3 py-2.5 text-black`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
