import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleLogin from '@/components/SimpleLogin/SimpleLogin';
import Button from '@/components/Buttons/Button';

const Landing = () => {
  const navigate = useNavigate();

  const handleGoLogin = useCallback(() => navigate('/login'), []);
  const handleGoSignup = useCallback(() => navigate('/login/signup'), []);

  return (
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
  );
};

export default Landing;
