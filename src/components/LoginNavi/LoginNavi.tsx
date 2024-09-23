import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@/components/Alert/Alert';

const LoginNavi = () => {
  const [alert, setAlert] = useState<{
    type: 'notice' | 'error';
    title: string;
    subtext: string;
  } | null>(null);

  const handleSimpleLogin = () => {
    setAlert({
      type: 'error',
      title: '앗!',
      subtext: '아이디/비밀번호 찾기는 열심히 구현중입니다! 🐑💨',
    });
  };
  const handleCloseAlert = () => setAlert(null);

  return (
    <div className="flex items-center space-x-4 self-center text-[.875rem] font-normal">
      <button
        type="button"
        className="hover:text-mainblue focus:text-mainblue"
        onClick={handleSimpleLogin}
      >
        아이디 찾기
      </button>
      {/* <Link
        to="/find-id"
        className="hover:text-mainblue focus:text-mainblue"
        aria-label="아이디 찾기 페이지로 이동"
      >
        아이디 찾기
      </Link> */}
      <span aria-hidden="true">|</span>
      <button
        type="button"
        className="hover:text-mainblue focus:text-mainblue"
        onClick={handleSimpleLogin}
      >
        비밀번호 찾기
      </button>
      {/* <Link
        to="/find-password"
        className="hover:text-mainblue focus:text-mainblue"
        aria-label="비밀번호 찾기 페이지로 이동"
      >
        비밀번호 찾기
      </Link> */}
      <span aria-hidden="true">|</span>
      <Link
        to="/login/signup"
        className="hover:text-mainblue focus:text-mainblue"
        aria-label="회원가입 페이지로 이동"
      >
        회원가입 하기
      </Link>
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

export default LoginNavi;
