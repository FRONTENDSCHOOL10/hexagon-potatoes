interface PropsType {
  title: string;
  description: string;
}

const Standard = ({ title, description }: PropsType) => {
  return (
    <li className="list-none border-b border-b-gray-100 pb-3 leading-normal">
      <strong className="text-sub-1">{title}</strong>
      <p className="text-sub-2 text-gray-300">{description}</p>
    </li>
  );
};

export default Standard;
