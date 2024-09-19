import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img
        className="relative -translate-y-1/3 transform"
        src="/assets/shipmatelogo.png"
        alt="로고"
      />
      <p className="absolute font-body-1 font-bold">
        🐑 404 없는 페이지 입니다! 404 🐑
      </p>
      <Link to="-1">돌아가기</Link>
    </div>
  );
};

export default ErrorPage;
