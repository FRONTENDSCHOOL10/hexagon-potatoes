import React from 'react';
import { Link } from 'react-router-dom';
import IdInput from '@/components/Inputs/IdInput';
import PwdInput from '@/components/Inputs/PwdInput';
import Button from '@/components/Buttons/Button';
import SimpleLogin from '@/components/SimpleLogin/SimpleLogin';
import LoginNavi from '@/components/LoginNavi/LoginNavi';

const Login = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <img
        className="h-[5.9375rem] w-[21rem] self-center"
        src="/assets/loginsignuplogo.png"
        alt="SHIPMATE 작은 로고"
      />
      <IdInput
        inputName={''}
        defaultValue={''}
        onIdChange={function (name: string): (value: string | number) => void {
          throw new Error('Function not implemented.');
        }}
        onValidChange={function (validation: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
      <PwdInput
        inputName={''}
        onPwdChange={function (name: string): (value: string | number) => void {
          throw new Error('Function not implemented.');
        }}
        onValidChange={function (validation: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Button
        type={'button'}
        buttonContent={'로그인'}
        isActive
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SimpleLogin />
      <LoginNavi />
    </div>
  );
};

export default Login;
