import React, { memo } from 'react';
import Button from '../Buttons/Button';

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
        <svg className="h-[2.8125rem] w-[2.8125rem]" aria-hidden="true">
          <use href="/assets/sprite-sheet.svg#check" />
        </svg>
      );
    case 'error':
      return (
        <svg className="h-[2.8125rem] w-[2.8125rem]" aria-hidden="true">
          <use href="/assets/sprite-sheet.svg#error" />
        </svg>
      );
  }
};

const Alert: React.FC<AlertProps> = memo(
  ({ type, title, subtext, onClose }) => {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
        role="dialog"
        aria-labelledby="alertTitle"
        aria-describedby="alertDescription"
        aria-modal="true"
      >
        <div
          className="relative flex h-[13.4375rem] w-[20.625rem] flex-col items-center justify-center gap-3 rounded-lg bg-white p-6 shadow-lg"
          role="alert"
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
            <h2 id="alertTitle" className="text-2xl font-medium text-black">
              {title}
            </h2>
            <p id="alertDescription" className="text-xs font-light text-black">
              {subtext}
            </p>
          </div>
          {/* 닫기 버튼 */}
          <Button
            buttonContent="확인"
            isActive
            onClick={onClose}
            aria-label="닫기" // 버튼에 대한 접근성 레이블 추가
          />
        </div>
      </div>
    );
  }
);

export default Alert;
