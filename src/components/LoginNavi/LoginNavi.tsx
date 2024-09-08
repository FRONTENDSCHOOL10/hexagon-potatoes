import React from 'react';
import { Link } from 'react-router-dom';

const LoginNavi: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 self-center text-[.875rem] font-normal">
      <Link
        to="/find-id"
        className="hover:underline"
        aria-label="아이디 찾기 페이지로 이동"
      >
        아이디 찾기
      </Link>
      <span aria-hidden="true">|</span>
      <Link
        to="/find-password"
        className="hover:underline"
        aria-label="비밀번호 찾기 페이지로 이동"
      >
        비밀번호 찾기
      </Link>
      <span aria-hidden="true">|</span>
      <Link
        to="/login/signup"
        className="hover:underline"
        aria-label="회원가입 페이지로 이동"
      >
        회원가입 하기
      </Link>
    </div>
  );
};

export default LoginNavi;
