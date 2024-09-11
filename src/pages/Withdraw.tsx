import React from 'react';
import StandardInput from '@/components/Inputs/StandardInput';
import PwdInput from '@/components/Inputs/PwdInput';

const AccountDeletionPage = () => {
  return (
    <div className="">
      <h1 className="text-h1 text-black">정말 떠나시는 건가요? 한 번 더 생각해 보지 않으시겠어요?</h1>
      <p className="text-sub2 text-black">계정을 삭제하시는 이유를 말씀해주세요. 서비스 개선을 위한 자료로 활용하겠습니다.</p>

      <form className="space-y-4">
        <StandardInput
          type="text"
          inputName="reason"
          defaultValue=""
          onInputChange={() => {}}
          inputLabel="탈퇴 사유"
          placeholder="탈퇴 사유를 입력해주세요."
        />

        {/* 비밀번호 입력 */}
        <PwdInput
          inputName="password"
          onPwdChange={() => {}}
          onValidChange={() => {}}
        />

        <p className="text-error-red">
          계정 삭제 시 회원님의 모든 콘텐츠와 활동 기록이 삭제됩니다.
          삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.
        </p>

      </form>
    </div>
  );
};

export default AccountDeletionPage;
