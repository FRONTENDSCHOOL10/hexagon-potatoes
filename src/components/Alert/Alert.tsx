import React, { memo } from 'react';
import Button from '../Button/Button';

interface AlertProps {
  type: 'notice' | 'error';
  title: string;
  subtext: string;
  onClose: () => void; // 닫기 핸들러
}

const renderIcon = (type: 'notice' | 'error') => {
  switch (type) {
    case 'notice':
      return (
        <svg className="h-[2.8125rem] w-[2.8125rem]">
          <use href="/assets/sprite-sheet.svg#check" />
        </svg>
      );
    case 'error':
      return (
        <svg className="h-[2.8125rem] w-[2.8125rem]">
          <use href="/assets/sprite-sheet.svg#error" />
        </svg>
      );
  }
};

const Alert: React.FC<AlertProps> = memo(
  ({ type = 'notice', title, subtext, onClose }) => {
    return (
      <div
        className="relative flex h-[13.4375rem] w-[20.625rem] flex-col items-center justify-center gap-3 rounded-[.9375rem] bg-gray-100 p-6"
        role="alert"
        aria-live="assertive"
      >
        {/* 아이콘 영역 */}
        <div
          className="h-[2.8125rem] w-[2.8125rem] rounded-full"
          aria-hidden="true"
        >
          {renderIcon(type)}
        </div>
        {/* 제목과 부제목 영역 */}
        <div className="flex w-full flex-col gap-1.5 text-center">
          <h2 className="text-2xl font-medium text-black">{title}</h2>
          <p className="text-xs font-light text-black">{subtext}</p>
        </div>
        {/* 닫기 버튼 */}

        <Button
          buttonType="text"
          size="2.25rem"
          buttonContent="확인"
          isActive={true}
          imgSrc=""
          imgAlt=""
          // onClick={onClose}
        />
      </div>
    );
  }
);

export default Alert;
