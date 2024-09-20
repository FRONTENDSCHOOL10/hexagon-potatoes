import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/Buttons/Button';

const ErrorPage = () => {
  const navigate = useNavigate();
  function handleClick(): void {
    navigate('/home');
  }

  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 | Shipmate</title>
        <meta
          name="description"
          content="404 오류: 요청한 페이지를 찾을 수 없습니다."
        />
      </Helmet>
      <div className="flex h-screen items-center">
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-100 p-5">
          <img src="/assets/shipmatelogo.webp" alt="로고" />
          <p className="font-body-1 font-bold">
            🐑 404 없는 페이지 입니다! 404 🐑
          </p>
          <Button
            type={'button'}
            buttonContent={'홈으로 돌아가기'}
            isActive
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
