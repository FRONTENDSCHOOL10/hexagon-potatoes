import React from 'react';
import { Link } from 'react-router-dom';
import PwdInput from '@/components/Inputs/PwdInput';

const Landing = () => {
  return (
    <div>
      <h1>랜딩 페이지</h1>
      <div>
        <button>
          <Link to="/login">로그인</Link>
        </button>
        <button>
          <Link to="/login/signup">회원가입</Link>
        </button>
        <button>
          <Link to="/home">임시로 홈으로 가자</Link>
        </button>
      </div>
      <PwdInput/>
    </div>
  );
};

export default Landing;
