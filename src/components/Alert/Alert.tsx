import React, { memo } from 'react';

interface AlertProps {
  type: 'notice' | 'error';
  twobutton?: boolean;
  title: string;
  subtext: string;
}

const renderIcon = (type: string) => {
  switch (type) {
    case 'notice':
      return (
        <svg className="h-[2.8125rem] w-[2.8125rem]" href="/assets/check.svg" />
      );
    case 'error':
      return (
        <svg className="w-auto">
          <use href="/assets/error.svg" />
        </svg>
      );
  }
};

const Alert: React.FC<AlertProps> = memo(
  ({ type = 'notice', title, subtext }) => {
    return (
      <div
        className="relative flex h-[215px] w-[330px] flex-col items-center justify-center gap-3 rounded-[15px] bg-gray-100 p-6"
        role="alert"
        aria-live="assertive"
      >
        {/* 아이콘 영역 */}
        <div className="h-[45px] w-[45px] rounded-full" aria-hidden="true">
          {renderIcon(type)}
        </div>

        {/* 제목과 부제목 영역 */}
        <div className="flex w-full flex-col gap-1.5 text-center">
          <h2 className="text-2xl font-medium text-black">{title}</h2>
          <p className="text-xs font-light text-black">{subtext}</p>
        </div>
        <svg className="" href="/assets/check.svg" />
      </div>
    );
  }
);

export default Alert;
