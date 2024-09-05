interface ShipstatPropsType {
  step: 0 | 1 | 2 | 3 | 4;
}

const Shipstate = ({ step }: ShipstatPropsType) => {
  return (
    <div className="flex h-[3.0625rem] w-full flex-col gap-[0.625rem]">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={step}
        className="h-[0.5625rem] w-full rounded-[1.9375rem] bg-[#EDF1F6]"
      >
        <div
          className="h-[0.5625rem] rounded-[1.9375rem] bg-[#0A73F9]"
          style={{ width: `${step * 25}%` }} // 동적으로 받는 스타일은 테일윈드 백틱이 안먹음
        ></div>
      </div>
      <div className="relative flex justify-between font-[Pretendard] text-xs font-normal not-italic leading-[0.875rem] text-[#626871]">
        <span className="absolute left-0">발송완료</span>
        <span className="absolute left-1/4">통관 중</span>
        <span className="absolute left-2/4">국내 도착</span>
        <div className="absolute left-3/4 flex flex-col">
          <span className="mb-[0.3125rem] font-semibold text-[#020715]">
            배송 중
          </span>
          <span className="font-normal text-[#0A73F9]">배송 조회</span>
        </div>
      </div>
    </div>
  );
};

export default Shipstate;
