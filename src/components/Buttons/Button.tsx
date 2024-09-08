interface propsType {
  buttonContent: string;
  isActive: boolean;
  onClick: () => void;
}
const Button = ({ onClick, buttonContent, isActive = true }: propsType) => {
  return (
    <button
      disabled={!isActive}
      className={`inline-block w-full rounded-full ${isActive ? 'bg-white' : 'bg-gray-200'} px-3 py-2.5 text-button text-black shadow-shadow-blue hover:bg-mainblue hover:text-white`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
