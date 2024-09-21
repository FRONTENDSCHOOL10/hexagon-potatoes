import React, { useState } from 'react';
import NicknameInput from '@/components/Inputs/NickNameInput';
import EmailInput from '@/components/Inputs/EmailInput';
import Button from '@/components/Buttons/Button';
import NameCard from '@/components/NameCard/NameCard';

const ProfileEdit = () => {
  const [nickname, setNickname] = useState('John Doe');
  const [email, setEmail] = useState('example@mail.net');
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleNickNameChange = (name: string) => (value: string | number) => {
    setNickname(value as string);
  };

  const handleEmailChange = (name: string) => (value: string | number) => {
    setEmail(value as string);
  };

  const handleNicknameValidChange = (isValid: boolean) => {
    setIsNicknameValid(isValid);
  };

  const handleEmailValidChange = (isValid: boolean) => {
    setIsEmailValid(isValid);
  };

  const handleSubmit = () => {
    if (isNicknameValid && isEmailValid) {
      console.log('Profile saved:', { nickname, email });
      alert('프로필이 성공적으로 저장되었습니다!');
    } else {
      alert('닉네임이나 이메일이 유효하지 않습니다.');
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <NameCard
        name={nickname}
        subtext="Edit your profile below"
        profileImg={null}
      />

      <NicknameInput
        inputName="nickname"
        defaultValue={nickname}
        onNickNameChange={handleNickNameChange}
        onValidChange={handleNicknameValidChange}
      />

      <EmailInput
        inputName="email"
        defaultValue={email}
        onEmailChange={handleEmailChange}
        onValidChange={handleEmailValidChange}
      />

      <Button
        type="submit"
        buttonContent="변경사항 저장"
        isActive={isNicknameValid && isEmailValid}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default ProfileEdit;
