import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Alert from '@/components/Alert/Alert'; // Alert 컴포넌트 import

const Setting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isExactSettingRoute = location.pathname === '/home/setting';

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'notice' | 'error'>('notice');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLogoutConfirmation, setIsLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    // 로그아웃 확인 Alert 표시
    setIsLogoutConfirmation(true);
    setAlertVisible(true);
    setAlertType('notice');
    setAlertMessage('로그아웃 하시겠습니까?');
  };

  const confirmLogout = () => {
    // 실제 로그아웃 수행
    localStorage.removeItem('authToken');
    localStorage.removeItem('authId');

    // 로그아웃 완료 메시지 표시
    setAlertMessage('로그아웃이 완료되었습니다.');
    setIsLogoutConfirmation(false); // 로그아웃 확인 상태 해제

    // 로그아웃 완료 후 최초 화면으로 이동
    setTimeout(() => {
      setAlertVisible(false);
      navigate('/'); // 최초 화면으로 이동
    }, 1500); // 1.5초 후 이동
  };

  const handleCloseAlert = () => {
    if (isLogoutConfirmation) {
      confirmLogout();
    } else {
      setAlertVisible(false);
    }
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
        {alertVisible && (
          <Alert
            type={alertType}
            title={alertType === 'notice' ? '알림' : '오류'}
            subtext={alertMessage}
            onClose={handleCloseAlert}
          />
        )}
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

            {/* 사용자 설정 */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="mb-2 text-[1rem] font-bold">사용자 설정</h2>
              <ul className="space-y-2 text-[0.875rem]">
                <li>
                  <Link
                    to="account"
                    className="cursor-pointer hover:text-mainblue"
                  >
                    개인정보 수정
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

            {/* 기타 설정 */}
            <div className="border-b border-gray-200 pb-4">
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
