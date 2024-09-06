interface propsType {
  buttonContent: string;
  isActive: boolean;
  btnSize: string;
  buttonColor: string;
  onClick: () => void;
}
const Button = ({ onClick, buttonContent, isActive = true }: propsType) => {
  return (
    <button
      disabled={!isActive}
      className={`inline-block w-full rounded-full ${isActive ? 'bg-mainblue' : 'bg-gray-200'} px-3 py-2.5 text-button text-white hover:bg-maingreen hover:text-mainblue`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
