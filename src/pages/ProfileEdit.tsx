import React, { useState, useEffect } from 'react';
import NicknameInput from '@/components/Inputs/NickNameInput';
import EmailInput from '@/components/Inputs/EmailInput';
import Button from '@/components/Buttons/Button';
import NameCard from '@/components/NameCard/NameCard';
import StandardInput from '@/components/Inputs/StandardInput';
import FileInput from '@/components/FileInput/FileInput';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import axios from 'axios';
import { Skeleton } from '@/components/LoadingSpinner';
import Alert from '@/components/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface PocketBaseRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  [key: string]: any;
}

interface ProfileType extends PocketBaseRecord {
  profile_photo: string;
  nickname: string;
  user_email: string;
  user_desc?: string;
}

interface FileData {
  id: string;
  file: File;
  previewUrl: string;
}

const ProfileEdit = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [userDesc, setUserDesc] = useState('');
  const [profilePhotos, setProfilePhotos] = useState<FileData[]>([]);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
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
              'Authorization': `Bearer ${authToken}`,
            },
          }
        );

        if (response.data) {
          setProfile(response.data);
          setNickname(response.data.nickname);
          setEmail(response.data.user_email);
          setUserDesc(response.data.user_desc || '');
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

  const handleNickNameChange = (name: string) => (value: string | number) => {
    setNickname(value as string);
  };

  const handleEmailChange = (name: string) => (value: string | number) => {
    setEmail(value as string);
  };

  const handleUserDescChange = (name: string) => (value: string | number) => {
    setUserDesc(value as string);
  };

  const handleNicknameValidChange = (isValid: boolean) => {
    setIsNicknameValid(isValid);
  };

  const handleEmailValidChange = (isValid: boolean) => {
    setIsEmailValid(isValid);
  };

  const handleProfilePhotoChange = (files: FileData[]) => {
    setProfilePhotos(files);
  };

  const handleSubmit = async () => {
    if (!isNicknameValid || !isEmailValid) {
      setAlertType('error');
      setAlertMessage('닉네임이나 이메일이 유효하지 않습니다.');
      setAlertVisible(true);
      return;
    }

    const authToken = localStorage.getItem('authToken'); 

    try {
      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('user_email', email);
      formData.append('user_desc', userDesc);

      if (profilePhotos.length > 0) {
        formData.append('profile_photo', profilePhotos[0].file);
      }

      const response = await axios.patch(
        `${pb.baseUrl}/api/collections/users/records/${profile?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`, 
          },
        }
      );

      if (response.status === 200) {
        setAlertType('notice');
        setAlertMessage('프로필이 성공적으로 저장되었습니다!');
        setAlertVisible(true);
      } else {
        setAlertType('error');
        setAlertMessage('프로필 업데이트 중 문제가 발생했습니다.');
        setAlertVisible(true);
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setAlertType('error');
      setAlertMessage(`프로필을 저장하는 중 문제가 발생했습니다: ${err.message}`);
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
    <div className="p-4 flex flex-col gap-6">
      <Helmet>
        <title>
          프로필 수정 | Shipmate
        </title>
      </Helmet>
      {alertVisible && (
        <Alert
          type={alertType}
          title={alertType === 'notice' ? '성공' : '오류'}
          subtext={alertMessage}
          onClose={handleCloseAlert}
        />
      )}

      <NameCard
        name={nickname}
        subtext={userDesc || 'Edit your profile below'}
        profileImg={
          profile?.profile_photo ? getPbImageURL(pb.baseUrl, profile, 'profile_photo') : ''
        }
      />

      <FileInput onChange={handleProfilePhotoChange} maxFiles={1} />

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

      <StandardInput
        type="text"
        inputName="userDesc"
        value={userDesc}
        onInputChange={handleUserDescChange}
        inputLabel="한줄 소개"
        placeholder="한줄 소개를 입력하세요"
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
