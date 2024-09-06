// 레이블 데이터 가져오기
import Label from './Label';

const data = ['미국', '간식', '초콜릿'];

const LabelList = () => {
  return (
    <ul className="my-2.5 flex flex-row text-caption">
      {/* 가져온 데이터 전달 */}
      {data.map((label) => (
        <Label label={label} key={label} />
      ))}
    </ul>
  );
};

export default LabelList;
