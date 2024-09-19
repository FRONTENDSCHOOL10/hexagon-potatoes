import Button from '@/components/Buttons/Button';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const EmptyPage = () => {
  const navigate = useNavigate();
  function handleClick(): void {
    navigate('/home');
  }

  return (
    <>
      <Helmet>
        <title>페이지 준비 중 | Shipmate</title>
        <meta
          name="description"
          content="현재 페이지가 개발 중입니다. 잠시만 기다려 주세요."
        />
      </Helmet>
      <div className="flex h-screen items-center">
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-100 px-20 py-5">
          <img src="/assets/shipmatelogo.png" alt="로고" />
          <p className="font-body-1 font-bold">🐑 개발중입니다! 🐑</p>
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

export default EmptyPage;
