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
        <svg fill="none" viewBox="0 0 46 45">
          <g clipPath="url(#a)">
            <path
              fill="#0A73F9"
              d="M23 0a22.5 22.5 0 1 0 0 45 22.5 22.5 0 0 0 0-45Zm11.6 19.7L26.3 28a7.5 7.5 0 0 1-10.4 0l-3.6-3.5a1.9 1.9 0 1 1 2.6-2.7l3.6 3.5a3.7 3.7 0 0 0 5.2 0L32 17a1.9 1.9 0 1 1 2.6 2.7Z"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h45v45H0z" transform="translate(.5)" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'error':
      return (
        <svg fill="none" viewBox="0 0 46 45">
          <circle cx="23" cy="22.5" r="22.5" fill="#E8134B" />
          <rect width="5" height="21" x="20.5" y="8" fill="#fff" rx="2.5" />
          <rect width="5" height="5" x="20.5" y="32" fill="#fff" rx="2.5" />
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
          onClick={onClose}
        />
      </div>
    );
  }
);

export default Alert;
