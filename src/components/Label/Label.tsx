interface PropTypes {
  label: string;
}

const Label = ({ label }: PropTypes) => {
  return <li className="mr-1 rounded bg-gray-100 p-1">{label}</li>;
};

export default Label;
