import React, { useState, useEffect } from 'react';
import AddressInput from '@/components/Inputs/AddressInput';
import PhoneNumberInput from '@/components/Inputs/PhoneNumberInput';
import PwdInput from '@/components/Inputs/PwdInput';
import PwdConfirmInput from '@/components/Inputs/PwdConfirmInput';
import StandardInput from '@/components/Inputs/StandardInput';
import Button from '@/components/Buttons/Button';
import axios from 'axios';
import pb from '@/utils/pocketbase';
import Alert from '@/components/Alert/Alert'; 
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'; 
import { Skeleton } from '@/components/LoadingSpinner';

interface ProfileType {
  id: string;
  address?: string;
  detailAddress?: string;
  phone_number?: string;
  customs_number?: string;
}

const AccountSettings = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState(''); 
  const [customsNumber, setCustomsNumber] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'notice' | 'error'>('notice');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        const localUserId = localStorage.getItem('authId');
        const authToken = localStorage.getItem('authToken'); 

        if (!localUserId) {
          setError('유효한 사용자 ID가 없습니다.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${pb.baseUrl}/api/collections/users/records/${localUserId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            },
          }
        );

        if (response.data) {
          setProfile(response.data);
          setAddress(response.data.address || '');
          setDetailAddress(response.data.detailAddress || '');
          setPhoneNumber(response.data.phone_number || '');
          setCustomsNumber(response.data.customs_number || '');
        } else {
          setError('사용자 정보를 찾을 수 없습니다.');
        }
      } catch (err: any) {
        setError(`프로필 정보를 가져오는 중 문제가 발생했습니다: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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

  const handleOldPasswordChange = (name: string) => (val: string | number) => {
    setOldPassword(val as string);
  };

  const handleCustomsNumberChange = (name: string) => (val: string | number) => {
    setCustomsNumber(val as string);
  };

  const handleSaveChanges = async () => {
    if (!isValidPassword || !isPasswordConfirmed) {
      setAlertType('error');
      setAlertMessage('비밀번호가 올바르지 않거나 일치하지 않습니다.');
      setAlertVisible(true);
      return;
    }

    const authToken = localStorage.getItem('authToken');

    try {
      const formData = new FormData();
      formData.append('address', address);
      formData.append('detailAddress', detailAddress);
      formData.append('phone_number', phoneNumber);
      formData.append('customs_number', customsNumber);

      if (password) {
        formData.append('password', password);
        formData.append('passwordConfirm', confirmPassword);
        formData.append('oldPassword', oldPassword); 
      }

      const response = await axios.patch(
        `${pb.baseUrl}/api/collections/users/records/${profile?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`, 
          },
        }
      );

      if (response.status === 200) {
        setAlertType('notice');
        setAlertMessage('변경사항이 성공적으로 저장되었습니다!');
        setAlertVisible(true);
      } else {
        setAlertType('error');
        setAlertMessage('변경사항 저장 중 문제가 발생했습니다.');
        setAlertVisible(true);
      }
    } catch (err: any) {
      console.error('Error saving changes:', err);
      setAlertType('error');
      setAlertMessage(`변경사항을 저장하는 중 문제가 발생했습니다: ${err.message}`);
      setAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    navigate(-1);
  };

  if (loading) {
    return <Skeleton className="h-72 w-full" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Helmet>
        개인정보 수정 | Shipmate
      </Helmet>
      <div className="flex flex-col gap-6">
      {alertVisible && (
        <Alert
          type={alertType}
          title={alertType === 'notice' ? '성공' : '오류'}
          subtext={alertMessage}
          onClose={handleCloseAlert}
        />
      )}

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
      <div className="border-b border-gray-200"></div>
      <p className="text-errored text-sub-1">기존 비밀번호를 입력하세요.</p>
      <PwdInput
        inputName="oldPassword"
        onPwdChange={handleOldPasswordChange}
        onValidChange={() => {}}
      />
      <div className="border-b border-gray-200"></div>
      <p className="text-errored text-sub-1">새로운 비밀번호를 입력하세요.</p>
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
        isActive={isValidPassword && isPasswordConfirmed}
        onClick={handleSaveChanges}
      />
    </div>
    </>
  );
};

export default AccountSettings;
