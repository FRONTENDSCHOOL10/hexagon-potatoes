import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Buttons/Button';
import Alert from '@/components/Alert/Alert'; // Alert 컴포넌트 임포트
import { Tooltip } from 'react-tooltip';

const Landing = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{
    type: 'notice' | 'error';
    title: string;
    subtext: string;
  } | null>(null);

  const handleGoLogin = () => navigate('/login');
  const handleGoSignup = () => navigate('/login/signup');
  const handleSimpleLogin = () => {
    setAlert({
      type: 'error',
      title: '앗!',
      subtext: '간편 로그인은 열심히 구현중입니다! 🐑💨',
    });
  };

  const handleCloseAlert = () => setAlert(null);

  return (
    <main className="flex h-screen flex-col items-center justify-start gap-3 bg-white p-3">
      <img
        className="h-[33.5625rem] w-[21.375rem] rounded-[1.875rem]"
        src="/assets/landinglogo.png"
        alt="SHIPMATE 메인 이미지"
      />
      <Button buttonContent="로그인" isActive onClick={handleGoLogin} />
      <Button buttonContent="회원가입" isActive onClick={handleGoSignup} />
      <div className="text-gray300 text-center text-xs font-normal leading-5">
        SNS 계정으로 간편 로그인하기
      </div>
      <div className="flex w-[9.125rem] gap-[.8125rem]">
        {/* 구글 */}
        <button data-tooltip-id="googleTooltip" onClick={handleSimpleLogin}>
          <svg className="h-10 w-10">
            <use href="/assets/google.svg#google" />
          </svg>
        </button>
        <Tooltip
          id="googleTooltip"
          content="구글로 로그인"
          place="bottom-end"
        />

        {/* 카카오 */}
        <button data-tooltip-id="kakaoTooltip" onClick={handleSimpleLogin}>
          <svg className="h-10 w-10">
            <use href="/assets/kakao.svg#kakao" />
          </svg>
        </button>
        <Tooltip id="kakaoTooltip" content="카카오로 로그인" place="bottom" />

        {/* 애플 */}
        <button data-tooltip-id="appleTooltip" onClick={handleSimpleLogin}>
          <svg className="h-10 w-10">
            <use href="/assets/apple.svg#apple" />
          </svg>
        </button>
        <Tooltip
          id="appleTooltip"
          content="애플로 로그인"
          place="bottom-start"
        />
      </div>

      {/* Alert 모달 표시 */}
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          subtext={alert.subtext}
          onClose={handleCloseAlert}
        />
      )}
    </main>
  );
};

export default Landing;
