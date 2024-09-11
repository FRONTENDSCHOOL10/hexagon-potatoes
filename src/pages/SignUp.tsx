import React from 'react';
import UserNameInput from '../components/Inputs/UserNameInput';
import IdInput from '@/components/Inputs/IdInput';
import EmailInput from '@/components/Inputs/EmailInput';
import NicknameInput from '../components/Inputs/NickNameInput';
import PhoneNumberInput from '@/components/Inputs/PhoneNumberInput';
import Button from '../components/Buttons/Button';
import PwdInput from '@/components/Inputs/PwdInput';
import PwdConfirmInput from '@/components/Inputs/PwdConfirmInput';
import AgreeTo from '@/components/AgreeTo/AgreeTo';

const SignUp = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <img
        className="h-[5.9375rem] w-[21rem] self-center"
        src="/assets/loginsignuplogo.png"
        alt="SHIPMATE 작은 로고"
      />
      <UserNameInput
        inputName={''}
        defaultValue={''}
        onUserNameChange={function (
          name: string
        ): (value: string | number) => void {
          throw new Error('Function not implemented.');
        }}
        onValidChange={function (validation: boolean): void {
          throw new Error('Function not implemented.');
        }}
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
      <EmailInput
        inputName={''}
        defaultValue={''}
        onEmailChange={function (
          name: string
        ): (value: string | number) => void {
          throw new Error('Function not implemented.');
        }}
        onValidChange={function (validation: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
      <NicknameInput
        inputName={''}
        defaultValue={''}
        onNickNameChange={function (
          name: string
        ): (value: string | number) => void {
          throw new Error('Function not implemented.');
        }}
        onValidChange={function (validation: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
      <PhoneNumberInput
        inputName={''}
        defaultValue={''}
        onPhoneNumberChange={function (
          name: string
        ): (value: string | number) => void {
          throw new Error('Function not implemented.');
        }}
        onValidChange={function (validation: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Button
        type={'button'}
        buttonContent={''}
        isActive={false}
        onClick={function (): void {
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

      <PwdConfirmInput
        inputName={''}
        pwdInputVal={''}
        onConfirmedPwdChange={function (val: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <AgreeTo />
      <Button
        buttonContent={'회원가입'}
        isActive={false}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default SignUp;
