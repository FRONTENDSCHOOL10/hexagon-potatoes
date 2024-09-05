interface RatingStarProps {
  value: number;
  filledColor?: string;
  emptyColor?: string;
}

// value로 받은 숫자 반올림해서 별점으로 표시
// 사이즈는 피그마에 나온사이즈로 고정(w-11 h-12)
const RatingStar = ({
  value,
  filledColor = 'text-[#FAEB48]',
  emptyColor = 'text-[#CAD4E7]',
}: RatingStarProps) => {
  const roundedValue = Math.round(value);

  interface StarIconProp {
    filled: boolean;
  }

  const StarIcon = ({ filled }: StarIconProp) => (
    <svg
      className={`h-[0.75rem] w-[0.6875rem] ${filled ? filledColor : emptyColor}`}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_539_4320)">
        <path
          fill="currentColor"
          d="M0.608175 6.19998L2.23984 7.49998L1.62017 9.59348C1.52003 9.91817 1.51877 10.2695 1.61656 10.595C1.71435 10.9206 1.90597 11.2029 2.16284 11.4C2.41532 11.6034 2.72127 11.7123 3.03512 11.7106C3.34897 11.7089 3.65391 11.5966 3.90451 11.3905L5.49997 10.1095L7.09588 11.389C7.3479 11.5912 7.65221 11.701 7.96505 11.7027C8.2779 11.7044 8.58317 11.5978 8.83698 11.3982C9.09079 11.1987 9.28007 10.9165 9.3776 10.5922C9.47512 10.2679 9.47588 9.91826 9.37976 9.59348L8.76009 7.49998L10.3918 6.19998C10.6434 5.99923 10.8305 5.71685 10.9263 5.39317C11.0221 5.06949 11.0217 4.72107 10.9251 4.39767C10.8285 4.07427 10.6407 3.79244 10.3886 3.59243C10.1364 3.39242 9.83271 3.28446 9.52093 3.28398H7.51663L6.90842 1.21598C6.81278 0.890456 6.62484 0.606484 6.3717 0.40501C6.11857 0.203536 5.81331 0.0949707 5.49997 0.0949707C5.18662 0.0949707 4.88137 0.203536 4.62823 0.40501C4.37509 0.606484 4.18715 0.890456 4.09151 1.21598L3.4833 3.28398H1.48084C1.16906 3.28446 0.865387 3.39242 0.613207 3.59243C0.361027 3.79244 0.173235 4.07427 0.0766553 4.39767C-0.0199244 4.72107 -0.0203519 5.06949 0.075434 5.39317C0.17122 5.71685 0.358319 5.99923 0.610008 6.19998H0.608175Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_539_4320">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="flex gap-1 p-0" aria-label={`5점만점에 ${roundedValue}점`}>
      {[...Array(5)].map((_, index) => (
        <StarIcon key={index} filled={index < roundedValue} />
      ))}
    </div>
  );
};

export default RatingStar;
