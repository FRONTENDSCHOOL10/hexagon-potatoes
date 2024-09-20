import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IdInput from '@/components/Inputs/IdInput';
import PwdInput from '@/components/Inputs/PwdInput';
import Button from '@/components/Buttons/Button';
import SimpleLogin from '@/components/SimpleLogin/SimpleLogin';
import LoginNavi from '@/components/LoginNavi/LoginNavi';
import { loginUser } from '@/api/auth';
import Alert from '@/components/Alert/Alert';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const authData = await loginUser(username, password);
      localStorage.setItem('authToken', authData.token);
      localStorage.setItem('authId', authData.record.id);
      navigate('/home');
    } catch (error) {
      setAlertMessage('아이디 또는 비밀번호를 확인해주세요.');
      setAlertVisible(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>로그인 | Shipmate</title>
        <meta
          name="description"
          content="Shipmate에 로그인하여 해외직구의 새로운 경험을 시작하세요. 안전하고 간편한 로그인으로 원하시는 상품을 쉽게 구매하세요."
        />
        <meta
          name="keywords"
          content="로그인, 해외직구, 쇼핑, 아이디, 비밀번호, 회원가입"
        />
      </Helmet>
      <div className="flex flex-col gap-3 p-3">
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <img
            className="h-[5.9375rem] w-[21rem] self-center"
            src="/assets/loginsignuplogo.webp"
            alt="SHIPMATE 작은 로고"
          />
          <IdInput
            inputName="username"
            onIdChange={(name) => (value) => {
              setUsername(value as string);
            }}
            onValidChange={() => {}}
            validateOnChange={false}
          />
          <PwdInput
            inputName="password"
            onPwdChange={(name) => (value) => {
              setPassword(value as string);
            }}
            onValidChange={() => {}}
            validateOnChange={false}
            onEnter={handleLogin}
          />
          <Button
            type="submit"
            buttonContent="로그인"
            isActive
            onClick={() => {}}
          />
          {error && <p className="text-errored">{error}</p>}
          <SimpleLogin />
          <LoginNavi />
          {alertVisible && (
            <Alert
              type={'error'}
              title={'로그인 실패'}
              subtext={alertMessage}
              onClose={() => {
                setAlertVisible(false);
              }}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
