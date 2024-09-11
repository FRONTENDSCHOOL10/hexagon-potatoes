import React from 'react';

const Setting = () => {
  return (
    <div className="p-4 space-y-8 gap-[1.25rem]">
    {/* 알림 설정 */}
    <div className="border-b border-gray-200 pb-4">
      <h2 className="text-[1rem] font-bold mb-2">알림 설정</h2>
      <ul className="space-y-2 text-[0.875rem]">
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">알림 수신 설정</a>
        </li>
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">방해금지 시간 설정</a>
        </li>
      </ul>
    </div>
    
    {/* 사용자 설정 */}
    <div className="border-b border-gray-200 pb-4">
      <h2 className="text-[1rem] font-bold mb-2">사용자 설정</h2>
      <ul className="space-y-2 text-[0.875rem]">
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">계정 / 정보 관리</a>
        </li>
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">차단 사용자 관리</a>
        </li>
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">기타 설정</a>
        </li>
      </ul>
    </div>

    <div className="pb-4">
      <h2 className="text-[1rem] font-bold mb-2">기타</h2>
      <ul className="space-y-2 text-[0.875rem]">
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">공지사항</a>
        </li>
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">국가 변경</a>
        </li>
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">캐시 데이터 삭제하기</a>
        </li>
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">최신버전 업데이트</a>
        </li>
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">로그아웃</a>
        </li>
        <li>
          <a href="#" className="hover:text-mainblue cursor-pointer">탈퇴하기</a>
        </li>
      </ul>
    </div>
  </div>
  );
};

export default Setting;
