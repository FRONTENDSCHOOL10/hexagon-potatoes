import React, { useState } from 'react';
import UserNameInput from '../components/Inputs/UserNameInput';
import IdInput from '@/components/Inputs/IdInput';
import EmailInput from '@/components/Inputs/EmailInput';
import NicknameInput from '../components/Inputs/NickNameInput';
import PhoneNumberInput from '@/components/Inputs/PhoneNumberInput';
import Button from '../components/Buttons/Button';
import PwdInput from '@/components/Inputs/PwdInput';
import PwdConfirmInput from '@/components/Inputs/PwdConfirmInput';
import AgreeTo from '@/components/AgreeTo/AgreeTo';
import createUser from '@/api/createUser'; // createUser 함수 import
import Alert from '@/components/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    user_email: '',
    nickname: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const [validation, setValidation] = useState({
    nameValid: true,
    usernameValid: true,
    emailValid: true,
    nicknameValid: true,
    phoneNumberValid: true,
    passwordValid: true,
    passwordsMatch: true,
  });

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (name: string) => (value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'confirmPassword') {
      setValidation((prev) => ({
        ...prev,
        passwordsMatch: formData.password === value,
      }));
    }
  };

  const handleValidChange = (key: string) => (isValid: boolean) => {
    setValidation((prev) => ({ ...prev, [key]: isValid }));
  };

  const handleAgreeChange = (allChecked: boolean) => {
    setIsAllChecked(allChecked);
  };

  const handleClose = () => {
    navigate('/login');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isAllPass) {
      try {
        await createUser({
          name: formData.name,
          username: formData.username,
          user_email: formData.user_email,
          email: formData.user_email,
          nickname: formData.nickname,
          phone_number: formData.phone_number,
          password: formData.password,
          passwordConfirm: formData.confirmPassword,
        });
        setAlertMessage('회원가입 성공!');
        setAlertVisible(true);
      } catch (error) {
        console.error('회원가입 오류:', error);
        setAlertMessage('회원가입 오류. 다시 시도해 주세요.');
        setAlertVisible(true);
      }
    } else {
      console.log('유효성 검사 실패');
      setAlertMessage('유효성 검사 실패. 입력값을 확인해 주세요.');
      setAlertVisible(true);
    }
  };

  const isFormValid = Object.values(validation).every((v) => v);
  const isAllPass = isFormValid && isAllChecked;

  return (
    <>
      <Helmet>
        <title>회원가입 | Shipmate</title>
        <meta
          name="description"
          content="쉽메이트 회원가입 페이지에서 새 계정을 생성하고 배송비 절약의 첫걸음을 시작하세요."
        />
        <meta name="keywords" content="회원가입, 배송비, 쉽메이트, 계정 생성" />
      </Helmet>
      <form
        className="mx-auto flex max-w-md flex-col gap-3 p-4"
        onSubmit={handleSubmit}
      >
        <img
          className="mx-auto h-[5.9375rem] w-[21rem]"
          src="/assets/loginsignuplogo.webp"
          alt="SHIPMATE 작은 로고"
        />
        <UserNameInput
          inputName="name"
          onUserNameChange={() => handleChange('name')}
          onValidChange={handleValidChange('nameValid')}
        />
        <IdInput
          inputName="username"
          onIdChange={() => handleChange('username')}
          onValidChange={handleValidChange('usernameValid')}
          validateOnChange
        />
        <EmailInput
          inputName="user_email"
          onEmailChange={() => handleChange('user_email')}
          onValidChange={handleValidChange('emailValid')}
        />
        <NicknameInput
          inputName="nickname"
          onNickNameChange={() => handleChange('nickname')}
          onValidChange={handleValidChange('nicknameValid')}
        />
        <PhoneNumberInput
          inputName="phone_number"
          onPhoneNumberChange={() => handleChange('phone_number')}
          onValidChange={handleValidChange('phoneNumberValid')}
        />
        <PwdInput
          inputName="password"
          onPwdChange={() => handleChange('password')}
          onValidChange={handleValidChange('passwordValid')}
        />
        <PwdConfirmInput
          inputName="confirmPassword"
          pwdInputVal={formData.password}
          onConfirmedPwdChange={() => handleChange('confirmPassword')}
          onValidChange={handleValidChange('passwordsMatch')}
        />
        <AgreeTo
          isAllChecked={isAllChecked}
          onAllCheckedChange={handleAgreeChange}
        />
        <Button
          buttonContent="회원가입"
          isActive={isAllPass}
          type="submit"
          onClick={() => {}}
        />
        {alertVisible && (
          <Alert
            type={'notice'}
            title={alertMessage}
            subtext={'로그인 페이지로 이동합니다.'}
            onClose={() => {
              setAlertVisible(false);
              if (alertMessage === '회원가입 성공!') {
                navigate('/login');
              }
            }}
          />
        )}
      </form>
    </>
  );
};

export default SignUp;
