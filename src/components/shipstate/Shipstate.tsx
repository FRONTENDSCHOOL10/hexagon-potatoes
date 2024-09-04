interface ShipstatPropsType {
  step: 0 | 1 | 2 | 3 | 4;
}

const Shipstate = ({ step }: ShipstatPropsType): JSX.Element => {
  return (
    <div className="w-full h-[49px] flex [flex-flow:column] gap-[10px]">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={step}
        className="w-full h-[9px] rounded-[31px] bg-[#D9D9D9]"
      >
        <div
          className="h-[9px]  rounded-[31px] bg-[#000]"
          style={{ width: `${step * 25}%` }} // 동적으로 받는 스타일은 테일윈드 백틱이 안먹음
        ></div>
      </div>
      <div className="flex justify-between text-[#000] text-xs not-italic font-normal relative">
        <span className="absolute left-0">발송완료</span>
        <span className="absolute left-1/4">통관 중</span>
        <span className="absolute left-2/4">국내 도착</span>
        <span className="absolute left-3/4">배송 중</span>
      </div>
    </div>
  );
};

export default Shipstate;
