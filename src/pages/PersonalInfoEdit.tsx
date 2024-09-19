import React, { useState } from 'react';
import AddressInput from '@/components/Inputs/AddressInput';
import PhoneNumberInput from '@/components/Inputs/PhoneNumberInput';
import PwdInput from '@/components/Inputs/PwdInput';
import PwdConfirmInput from '@/components/Inputs/PwdConfirmInput';
import StandardInput from '@/components/Inputs/StandardInput';
import Button from '@/components/Buttons/Button';

const PersonalInfoEdit = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [customsNumber, setCustomsNumber] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);

  const handleAddressChange = (name: string) => (val: string | number) => {
    if (name === 'address') setAddress(val as string);
    if (name === 'detailAddress') setDetailAddress(val as string);
  };

  const handlePhoneNumberChange = (name: string) => (val: string | number) => {
    setPhoneNumber(val as string);
  };

  const handlePasswordChange = (name: string) => (val: string | number) => {
    setPassword(val as string);
  };

  const handleConfirmPasswordChange = (name: string) => (val: string | number) => {
    setConfirmPassword(val as string);
  };

  const handleCustomsNumberChange = (name: string) => (val: string | number) => {
    setCustomsNumber(val as string);
  };

  const handleSaveChanges = () => {
    if (!isValidPassword || !isPasswordConfirmed) {
      alert('비밀번호가 올바르지 않거나 일치하지 않습니다.');
      return;
    }

    console.log('저장된 정보:', {
      address,
      detailAddress,
      phoneNumber,
      password,
      customsNumber,
    });
    alert('변경사항이 저장되었습니다.');
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <AddressInput
        addressInputName="address"
        detailAddressInputName="detailAddress"
        defaultAddressVal={address}
        defaultDetailAddressVal={detailAddress}
        onAddressChange={handleAddressChange}
      />
      <PhoneNumberInput
        inputName="phoneNumber"
        defaultValue={phoneNumber}
        onPhoneNumberChange={handlePhoneNumberChange}
        onValidChange={() => {}}
      />
      <PwdInput
        inputName="password"
        onPwdChange={handlePasswordChange}
        onValidChange={setIsValidPassword}
      />
      <PwdConfirmInput
        inputName="confirmPassword"
        pwdInputVal={password}
        onConfirmedPwdChange={handleConfirmPasswordChange}
        onValidChange={setIsPasswordConfirmed}
      />
      <StandardInput
        type="text"
        inputName="customsNumber"
        defaultValue={customsNumber}
        onInputChange={handleCustomsNumberChange}
        inputLabel="통관번호 (선택)"
        placeholder="통관번호를 입력하세요"
      />
      <Button
        type="submit"
        buttonContent="변경사항 저장"
        isActive={true}
        onClick={handleSaveChanges}
      />
    </div>
  );
};

export default PersonalInfoEdit;
