import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Setting = () => {
  const location = useLocation();
  const isExactSettingRoute = location.pathname === '/home/setting'; 

  return (
    <div className="p-4 space-y-8 gap-[1.25rem]">
      {isExactSettingRoute && (
        <>
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-[1rem] font-bold mb-2">알림 설정</h2>
            <ul className="space-y-2 text-[0.875rem]">
              <li>
                <Link to="notification" className="hover:text-mainblue cursor-pointer">
                  알림 수신 설정
                </Link>
              </li>
              <li>
                <Link to="do-not-disturb" className="hover:text-mainblue cursor-pointer">
                  방해금지 시간 설정
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-[1rem] font-bold mb-2">사용자 설정</h2>
            <ul className="space-y-2 text-[0.875rem]">
              <li>
                <Link to="account" className="hover:text-mainblue cursor-pointer">
                  계정 / 정보 관리
                </Link>
              </li>
              <li>
                <Link to="blocked-users" className="hover:text-mainblue cursor-pointer">
                  차단 사용자 관리
                </Link>
              </li>
              <li>
                <Link to="other-settings" className="hover:text-mainblue cursor-pointer">
                  기타 설정
                </Link>
              </li>
            </ul>
          </div>

          <div className="pb-4">
            <h2 className="text-[1rem] font-bold mb-2">기타</h2>
            <ul className="space-y-2 text-[0.875rem]">
              <li>
                <Link to="announcements" className="hover:text-mainblue cursor-pointer">
                  공지사항
                </Link>
              </li>
              <li>
                <Link to="change-country" className="hover:text-mainblue cursor-pointer">
                  국가 변경
                </Link>
              </li>
              <li>
                <Link to="clear-cache" className="hover:text-mainblue cursor-pointer">
                  캐시 데이터 삭제하기
                </Link>
              </li>
              <li>
                <Link to="update-version" className="hover:text-mainblue cursor-pointer">
                  최신버전 업데이트
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default Setting;
