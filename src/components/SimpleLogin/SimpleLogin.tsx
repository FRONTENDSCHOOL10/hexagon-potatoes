import React, { useState } from 'react';
import Alert from '@/components/Alert/Alert'; // Alert 컴포넌트 임포트
import { Tooltip } from 'react-tooltip';
const SimpleLogin = () => {
  const [alert, setAlert] = useState<{
    type: 'notice' | 'error';
    title: string;
    subtext: string;
  } | null>(null);
  const handleSimpleLogin = () => {
    setAlert({
      type: 'error',
      title: '앗!',
      subtext: '간편 로그인은 열심히 구현중입니다! 🐑💨',
    });
  };
  const handleCloseAlert = () => setAlert(null);
  return (
    <div className="flex flex-col items-center">
      <div className="text-gray300 mb-3 text-center text-xs font-normal leading-5">
        SNS 계정으로 간편 로그인하기
      </div>
      <div className="flex w-[9.125rem] gap-[.8125rem]">
        {/* 구글 */}
        <button
          data-tooltip-id="googleTooltip"
          onClick={handleSimpleLogin}
          aria-label="구글로 로그인"
          type="button"
        >
          <svg className="h-10 w-10">
            <use href="/assets/google.svg#google" />
          </svg>
        </button>
        <Tooltip
          id="googleTooltip"
          content="구글로 로그인"
          place="bottom-end"
          globalCloseEvents={{
            escape: true,
            scroll: false,
            resize: false,
            clickOutsideAnchor: false,
          }}
        />

        {/* 카카오 */}
        <button
          data-tooltip-id="kakaoTooltip"
          onClick={handleSimpleLogin}
          aria-label="카카오로 로그인"
          type="button"
        >
          <svg className="h-10 w-10">
            <use href="/assets/kakao.svg#kakao" />
          </svg>
        </button>
        <Tooltip
          id="kakaoTooltip"
          content="카카오로 로그인"
          place="bottom"
          globalCloseEvents={{
            escape: true,
            scroll: false,
            resize: false,
            clickOutsideAnchor: false,
          }}
        />

        {/* 애플 */}
        <button
          data-tooltip-id="appleTooltip"
          onClick={handleSimpleLogin}
          aria-label="애플로 로그인"
          type="button"
        >
          <svg className="h-10 w-10">
            <use href="/assets/apple.svg#apple" />
          </svg>
        </button>
        <Tooltip
          id="appleTooltip"
          content="애플로 로그인"
          place="bottom-start"
          globalCloseEvents={{
            escape: true,
            scroll: false,
            resize: false,
            clickOutsideAnchor: false,
          }}
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
    </div>
  );
};

export default SimpleLogin;
