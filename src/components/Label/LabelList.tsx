// 레이블 데이터 가져오기
import Label from './Label';

interface LabelListProps {
  data: string[];
}

const LabelList = ({ data }: LabelListProps) => {
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
