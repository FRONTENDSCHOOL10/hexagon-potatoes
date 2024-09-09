
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Buttons/Button';
import SimpleLogin from '../components/SimpleLogin/SimpleLogin';


const Landing = () => {
  const navigate = useNavigate();

  const handleGoLogin = () => navigate('/login');
  const handleGoSignup = () => navigate('/login/signup');

  return (

    <main className="flex h-screen flex-col items-center justify-start gap-3 bg-white p-3">
      <img
        className="h-[33.5625rem] w-[21.375rem] rounded-[1.875rem]"
        src="/assets/landinglogo.png"
        alt="SHIPMATE 메인 이미지"
      />
      <Button buttonContent="로그인" isActive onClick={handleGoLogin} />
      <Button buttonContent="회원가입" isActive onClick={handleGoSignup} />
      <SimpleLogin />
    </main>

  );
};

export default Landing;
