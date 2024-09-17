import React, { useState } from 'react';
import StandardInput from '@/components/Inputs/StandardInput';
import PwdInput from '@/components/Inputs/PwdInput';
import Button from '@/components/Button';

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
  
  const handleCheckboxChange = (e) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  };

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleWithdraw = () => {
    if (!password) {
      alert('Please enter your password to proceed.');
      return;
    }
    console.log('Reason:', selectedReason);
    console.log('Password:', password);
    console.log('Checkboxes:', checkboxes);
    alert('Account deleted successfully.');
  };

  return (
    <div className="">
      <h1 className="text-h1 text-black">정말 떠나시는 건가요? 한 번 더 생각해 보지 않으시겠어요?</h1>
      <p className="text-sub2 text-black">계정을 삭제하시는 이유를 말씀해주세요. 서비스 개선을 위한 자료로 활용하겠습니다.</p>

      <form className="space-y-4">
        <div>
          <label>
            <input type="checkbox" name="notUsed" checked={checkboxes.notUsed} onChange={handleCheckboxChange} />
            사용하지 않음
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="inconvenientUI" checked={checkboxes.inconvenientUI} onChange={handleCheckboxChange} />
            UI가 불편함
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="complicatedUse" checked={checkboxes.complicatedUse} onChange={handleCheckboxChange} />
            서비스 사용 방법이 복잡함
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="privacyConcerns" checked={checkboxes.privacyConcerns} onChange={handleCheckboxChange} />
            개인정보 유출 우려
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="appErrors" checked={checkboxes.appErrors} onChange={handleCheckboxChange} />
            앱 오류가 있음
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="other" checked={checkboxes.other} onChange={handleCheckboxChange} />
            기타
          </label>
        </div>

        {checkboxes.other && (
          <StandardInput
            type="text"
            inputName="reason"
            defaultValue=""
            onInputChange={handleReasonChange}
            inputLabel="탈퇴 사유"
            placeholder="탈퇴 사유를 입력해주세요."
          />
        )}

        <PwdInput
          inputName="password"
          onPwdChange={handlePasswordChange}
          onValidChange={() => {}}
        />

        <p className="text-error-red">
          계정 삭제 시 회원님의 모든 콘텐츠와 활동 기록이 삭제됩니다.
          삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.
        </p>

        <Button
          type="submit"
          buttonContent="탈퇴하기"
          isActive={password.length > 0}
          onClick={handleWithdraw}
        />
      </form>
    </div>
  );
};

export default Withdraw;
