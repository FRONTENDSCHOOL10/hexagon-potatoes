import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleLogin from '@/components/SimpleLogin/SimpleLogin';
import Button from '@/components/Buttons/Button';
import { Helmet } from 'react-helmet-async';

const Landing = () => {
  const navigate = useNavigate();

  const handleGoLogin = useCallback(() => navigate('/login'), []);
  const handleGoSignup = useCallback(() => navigate('/login/signup'), []);
  const handleBack = () => {
    sessionStorage.removeItem('tutorialCompleted');
    localStorage.removeItem('authId');
    localStorage.removeItem('authToken');
    navigate('/tutorial');
  };

  return (
    <>
      <Helmet>
        <title>시작 | Shipmate</title>
        <meta
          name="description"
          content="Shipmate에 어서오세요! 저희와 함께 사고 싶은 물건을 더 쉽고 가볍게 구매해보세요."
        />
        <meta
          name="keywords"
          content="랜딩 페이지, 직구, 해외직구, 쇼핑, 회원가입, 로그인"
        />

        <meta property="og:title" content="시작 | Shipmate" />
        <meta
          property="og:description"
          content="Shipmate에 어서오세요! 저희와 함께 사고 싶은 물건을 더 쉽고 가볍게 구매해보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sheepmate.netlify.app" />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/1044545035221352531/1287620951554527324/landing_1.png?ex=66f235f5&is=66f0e475&hm=143d17f0a2bdb88e9772825fab5b924e2cc2fdea9167cbe4dcc1bc82344d4b76&"
        />
      </Helmet>
      <main className="relative flex h-screen flex-col items-center justify-start gap-3 bg-white p-3">
        <h1 className="sr-only">랜딩 페이지</h1>
        <button
          type="button"
          className="absolute left-7 top-6 rounded-md bg-white px-1 text-button font-bold text-mainblue"
          onClick={handleBack}
          aria-label="튜토리얼로 돌아가기"
        >
          튜토리얼
        </button>
        <img
          className="h-[33.5625rem] w-[21.375rem] rounded-[1.875rem]"
          src="/assets/tutorial/landinglogo.webp"
          alt="SHIPMATE 메인 이미지"
        />
        <Button
          type="button"
          buttonContent="로그인"
          isActive
          onClick={handleGoLogin}
        />
        <Button
          type="button"
          buttonContent="회원가입"
          isActive
          onClick={handleGoSignup}
        />
        <SimpleLogin />
      </main>
    </>
  );
};

export default Landing;
