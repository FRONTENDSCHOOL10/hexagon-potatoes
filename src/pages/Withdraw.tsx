import axios from 'axios';
import React, { useState } from 'react';
import StandardInput from '@/components/Inputs/StandardInput';
import PwdInput from '@/components/Inputs/PwdInput';
import Button from '@/components/Buttons/Button';

const Withdraw = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [password, setPassword] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    notUsed: false,
    inconvenientUI: false,
    complicatedUse: false,
    privacyConcerns: false,
    appErrors: false,
    other: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (e) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);


      const endpoint = `${import.meta.env.VITE_PB_API}/collections/users/auth-with-password`;
      const userId = localStorage.getItem('authId');


      const passwordResponse = await axios.post(endpoint, {
        email: localStorage.getItem('authEmail'),
        password: password,
      });

      if (!passwordResponse.data) {
        setError('비밀번호가 일치하지 않습니다.');
        setIsLoading(false);
        return;
      }


      const deleteEndpoint = `${import.meta.env.VITE_PB_API}/collections/users/records/${userId}`;
      await axios.delete(deleteEndpoint);

      alert('계정이 성공적으로 삭제되었습니다.');


      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Error during account deletion:', error);
      setError('계정 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gap-[1rem]">
      <h1 className="text-h2 text-black my-[1.25rem]">
        정말 떠나시는 건가요? <br />한 번 더 생각해 보지 않으시겠어요?
      </h1>
      <p className="text-sub2 text-black my-[0.75rem]">
        계정을 삭제하시는 이유를 말씀해주세요. <br />
        서비스 개선을 위한 자료로 활용하겠습니다.
      </p>

      <form onSubmit={handleWithdraw} className="space-y-4">
        <div>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="notUsed"
              checked={checkboxes.notUsed}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 사용하지 않음
          </label>
        </div>

        <div>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="inconvenientUI"
              checked={checkboxes.inconvenientUI}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> UI가 불편함
          </label>
        </div>

        <div>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="complicatedUse"
              checked={checkboxes.complicatedUse}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 서비스 사용 방법이 복잡함
          </label>
        </div>

        <div>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="privacyConcerns"
              checked={checkboxes.privacyConcerns}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 개인정보 유출 우려
          </label>
        </div>

        <div>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="appErrors"
              checked={checkboxes.appErrors}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 앱 오류가 있음
          </label>
        </div>

        <div>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="other"
              checked={checkboxes.other}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="checkbox-custom mr-2"></span> 기타
          </label>
        </div>

        {checkboxes.other && (
          <StandardInput
            type="text"
            inputName="reason"
            defaultValue=""
            onInputChange={(value) => setSelectedReason(value)}
            inputLabel="탈퇴 사유"
            placeholder="탈퇴 사유를 입력해주세요."
          />
        )}

        <p className="text-errored text-sub-1">
          계정 삭제 시 회원님의 모든 콘텐츠와 활동 기록이 <br /> 삭제됩니다.
          삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.
        </p>

        <PwdInput inputName="password" onPwdChange={setPassword} />

        {error && <p className="text-error">{error}</p>}

        <Button
          type="submit"
          buttonContent="탈퇴하기"
          isActive={password.length > 0}
          onClick={handleWithdraw}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Withdraw;
