import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <button type="button">
        <Link to="/home">로그인</Link>
      </button>
    </div>
  );
};

export default Login;
