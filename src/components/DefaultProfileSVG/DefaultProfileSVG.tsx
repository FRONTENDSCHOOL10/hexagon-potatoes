// profileImg가 없을 경우 기본 프로필 컴포넌트
const DefaultProfileSVG = ({ size }: { size: number }) => {
  return (
    <svg
      role="img"
      className="flex-shrink-0"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="기본 프로필"
    >
      <use
        width={size}
        height={size}
        href="/assets/sprite-sheet.svg#defaultprofile"
      />
    </svg>
  );
};

export default DefaultProfileSVG;
