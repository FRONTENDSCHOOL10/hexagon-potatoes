import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const Setting = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const isExactSettingRoute = location.pathname === '/home/setting';

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('authId'); 
    // 로그아웃 후 리디렉션
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>설정 | Shipmate</title>
        <meta
          name="description"
          content="사용자 설정 및 알림 설정 관리 페이지"
        />
        <meta name="keywords" content="설정, 알림, 사용자, 관리" />
      </Helmet>
      <div className="gap-[1.25rem] space-y-8 p-4">
        {isExactSettingRoute && (
          <>
            {/* 알림 설정 */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="mb-2 text-[1rem] font-bold">알림 설정</h2>
              <ul className="space-y-2 text-[0.875rem]">
                <li>
                  <Link
                    to="notification"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    알림 수신 설정
                  </Link>
                </li>
                <li>
                  <Link
                    to="do-not-disturb"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    방해금지 시간 설정
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h2 className="mb-2 text-[1rem] font-bold">사용자 설정</h2>
              <ul className="space-y-2 text-[0.875rem]">
                <li>
                  <Link
                    to="account"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    계정 / 정보 관리
                  </Link>
                </li>
                <li>
                  <Link
                    to="blocked-users"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    차단 사용자 관리
                  </Link>
                </li>
                <li>
                  <Link
                    to="other-settings"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    기타 설정
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pb-4">
              <h2 className="mb-2 text-[1rem] font-bold">기타</h2>
              <ul className="space-y-2 text-[0.875rem]">
                <li>
                  <Link
                    to="announcements"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link
                    to="change-country"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    국가 변경
                  </Link>
                </li>
                <li>
                  <Link
                    to="clear-cache"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    캐시 데이터 삭제하기
                  </Link>
                </li>
                <li>
                  <Link
                    to="update-version"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    최신버전 업데이트
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pb-4">
              <h2 className="mb-2 text-[1rem] font-bold">기타</h2>
              <ul className="space-y-2 text-[0.875rem]">
                <li>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-mainblue"
                  >
                    로그아웃하기
                  </button>
                </li>
                <li>
                  <Link
                    to="withdraw"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    탈퇴하기
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        <Outlet />
      </div>
    </>
  );
};

export default Setting;
