interface PropTypes {
  filled: boolean;
  width: number;
  height: number;
}

const StarIcon = ({ filled, width, height }: PropTypes) => {
  return (
    <svg
      role="img"
      width={width}
      height={height}
      className={`${filled ? `text-[#FAEB48]` : `text-[#CAD4E7]`}`}
      viewBox={`0 0 ${width} ${height}`}
    >
      <use width={width} height={height} href="/assets/sprite-sheet.svg#star" />
    </svg>
  );
};

export default StarIcon;
