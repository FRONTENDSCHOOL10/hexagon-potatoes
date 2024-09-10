import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IdInput from '@/components/Inputs/IdInput';
import PwdInput from '@/components/Inputs/PwdInput';
import Button from '@/components/Buttons/Button';
import SimpleLogin from '@/components/SimpleLogin/SimpleLogin';
import LoginNavi from '@/components/LoginNavi/LoginNavi';
import { loginUser } from '@/api/auth';
import Alert from '@/components/Alert/Alert';

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
      navigate('/home');
    } catch (error) {
      setAlertMessage('아이디 또는 비밀번호를 확인해주세요.');
      setAlertVisible(true);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3">
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <img
          className="h-[5.9375rem] w-[21rem] self-center"
          src="/assets/loginsignuplogo.png"
          alt="SHIPMATE 작은 로고"
        />
        <IdInput
          inputName="username"
          onIdChange={(name) => (value) => {
            setUsername(value as string);
          }}
          onValidChange={() => {}}
        />
        <PwdInput
          inputName="password"
          onPwdChange={(name) => (value) => {
            setPassword(value as string);
          }}
          onValidChange={() => {}}
        />
        <Button
          type="submit"
          buttonContent="로그인"
          isActive
          onClick={() => {}}
        />
        {error && <p className="text-red-500">{error}</p>}
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
  );
};

export default Login;
