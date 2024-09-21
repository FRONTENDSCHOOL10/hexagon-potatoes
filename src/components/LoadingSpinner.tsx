import React, { useEffect, useState, useCallback } from 'react';
import logo from '/assets/logo.svg';

// 페이지 로딩 스피너는 페이지 이동할 때 PageLoadingSpinner
// 그냥 로딩 스피너는 컴포넌트 로딩할 떄 LoadingSpinner

export const PageLoadingSpinner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 6);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateActiveIndex, 500);

    return () => clearInterval(interval);
  }, [updateActiveIndex]);

  return (
    <div
      className="flex h-screen -translate-y-20 transform flex-col items-center justify-center gap-2"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">불러오는 중...</span>
      <div className="flex flex-row space-x-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-6 w-6 rounded-full transition-all duration-500 ${
              activeIndex > index ? 'bg-transparent' : 'bg-mainblue'
            }`}
            style={{
              backgroundImage: activeIndex > index ? `url(${logo})` : 'none',
              backgroundSize: 'cover',
            }}
            aria-hidden="true"
          ></div>
        ))}
      </div>
      <span className="font-body-2">열심히 불러오는 중</span>
    </div>
  );
};

export const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`relative rounded-md bg-gradient-to-b from-gray-200 to-transparent ${className}`} // 위에서 아래로 점점 투명하게
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">불러오는 중...</span>
    </div>
  );
};
