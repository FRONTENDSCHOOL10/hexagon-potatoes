interface LabelProps {
  label: string;
}

const Label = ({ label }: LabelProps) => {
  return <li className="mr-1 rounded bg-gray-100 p-1">{label}</li>;
};

export default Label;
