import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StandardInput from '@/components/Inputs/StandardInput';
import PwdInput from '@/components/Inputs/PwdInput';
import Button from '@/components/Buttons/Button';
import Alert from '@/components/Alert/Alert';
import { useNavigate } from 'react-router-dom'; 

interface ProfileType {
  id: string;
  user_email: string;
}

const Withdraw = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserEmail = async () => {
      const userId = localStorage.getItem('authId'); 
      const authToken = localStorage.getItem('authToken'); 

      if (!userId) {
        setError('사용자 정보를 가져올 수 없습니다. 다시 로그인 해주세요.');
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PB_API}/collections/users/records/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            },
          }
        );

        if (response.data && response.data.user_email) {
          setEmail(response.data.user_email);
        } else {
          setError('사용자 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
        setError('사용자 이메일을 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchUserEmail();
  }, []);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handlePasswordValidation = (isValid: boolean) => {
    setIsPasswordValid(isValid);
  };

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'other') {
      setShowReasonInput(e.target.checked);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (!email) {
      alert('이메일 정보를 불러오지 못했습니다. 다시 시도해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      setAlertVisible(true);
    } catch (error) {
      console.error('Error during account deletion:', error);
      setError('계정 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="gap-[1rem]">
      {alertVisible && (
        <Alert
          type="notice"
          title="탈퇴 완료"
          subtext="계정이 성공적으로 삭제되었습니다."
          onClose={handleCloseAlert}
        />
      )}
      <h1 className="text-h2 text-black my-[1.25rem]">
        정말 떠나시는 건가요? <br />한 번 더 생각해 보지 않으시겠어요?
      </h1>
      <p className="text-sub2 text-black my-[0.75rem]">
        계정을 삭제하시는 이유를 말씀해주세요. <br />
        서비스 개선을 위한 자료로 활용하겠습니다.
      </p>

      <form onSubmit={handleWithdraw} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="notUsed"
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 사용하지 않음
          </label>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="inconvenientUI"
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> UI가 불편함
          </label>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="complicatedUse"
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 사용법이 복잡함
          </label>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="privacyConcerns"
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 개인정보 우려
          </label>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="appErrors"
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 앱 오류
          </label>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="other"
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 기타
          </label>
        </div>

        {showReasonInput && (
          <StandardInput
            type="text"
            inputName="reason"
            defaultValue=""
            onInputChange={handleReasonChange}
            inputLabel="탈퇴 사유"
            placeholder="탈퇴 사유를 입력해주세요."
          />
        )}

        <p className="text-errored text-sub-1">
          계정 삭제 시 회원님의 모든 콘텐츠와 활동 기록이 <br /> 삭제됩니다.
          삭제된 정보는 복구할 수 없으니 <br /> 신중하게 결정해주세요.
        </p>

        <PwdInput
          inputName="password"
          onPwdChange={handlePasswordChange}
          onValidChange={handlePasswordValidation}
        />

        {error && <p className="text-error">{error}</p>}

        <Button
          type="submit"
          buttonContent="탈퇴하기"
          disabled={isLoading || password.length === 0}
        />
      </form>
    </div>
  );
};

export default Withdraw;
