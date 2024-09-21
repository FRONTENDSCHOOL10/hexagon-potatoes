import StarIcon from './Star';

interface PropTypes {
  value: number;
  width?: number;
  height?: number;
}

const RatingStar = ({
  value,
  width = 12,
  height = 11, // 기본 크기 지정
}: PropTypes) => {
  const roundedValue = Math.round(value);

  return (
    <div className="flex gap-1 p-0" aria-label={`5점 만점에 ${roundedValue}점`}>
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          width={width}
          height={height}
          filled={index < roundedValue}
        />
      ))}
    </div>
  );
};

export default RatingStar;
