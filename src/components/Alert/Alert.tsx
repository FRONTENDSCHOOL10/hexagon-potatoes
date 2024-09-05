import React, { memo } from 'react';

interface AlertProps {
  title: string;
  subtext: string;
}

const Alert: React.FC<AlertProps> = memo(({ title, subtext }) => {
  return (
    <div
      className="relative flex h-[215px] w-[330px] flex-col items-center justify-center gap-3 rounded-[15px] bg-gray-100 p-6"
      role="alert"
      aria-live="assertive"
    >
      {/* 아이콘 영역 */}
      <div
        className="h-[45px] w-[45px] rounded-full bg-white"
        aria-hidden="true"
      />

      {/* 제목과 부제목 영역 */}
      <div className="flex w-full flex-col items-center gap-1.5 text-center">
        <h2 className="text-2xl font-medium text-black">{title}</h2>
        <p className="text-xs font-light text-black">{subtext}</p>
      </div>
    </div>
  );
});

export default Alert;
