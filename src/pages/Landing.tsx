import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleLogin from '@/components/SimpleLogin/SimpleLogin';
import Button from '@/components/Buttons/Button';
import { Helmet } from 'react-helmet-async';

const Landing = () => {
  const navigate = useNavigate();

  const handleGoLogin = useCallback(() => navigate('/login'), []);
  const handleGoSignup = useCallback(() => navigate('/login/signup'), []);

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
          content="랜딩 페이지, 직구, 해외직구, 쇼핑, 회원가입, 로그"
        />
      </Helmet>
      <main className="flex h-screen flex-col items-center justify-start gap-3 bg-white p-3">
        <img
          className="h-[33.5625rem] w-[21.375rem] rounded-[1.875rem]"
          src="/assets/landinglogo.png"
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
