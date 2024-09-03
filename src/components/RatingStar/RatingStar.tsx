import ReactStars from 'react-stars';

interface RatingStarProp {
  value: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  size: number;
}

//value에 0-5까지 0.5단위로 받음
// 우선 별점이랑 사이즈만 받아서 보여주는 컴포넌트로 제작
// 별점 입력받아야하면 컴포넌트 수정해야됨
const RatingStar = ({ value, size }: RatingStarProp): JSX.Element => {
  return (
    <div>
      <ReactStars
        value={value}
        color2={'#ffc700'}
        color1={'rgba(0, 0, 0, 0)'}
        half={true}
        edit={false}
        size={size}
      />
    </div>
  );
};

export default RatingStar;
