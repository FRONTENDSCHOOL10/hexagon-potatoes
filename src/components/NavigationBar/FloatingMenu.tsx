import React, { useState, useEffect, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingMenu = memo(() => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  const navigateToPartyPage = () => {
    navigate('/home/partyCollect');
  };

  const navigateToCommunityPage = () => {
    navigate('/home/writepost');
  };

  // useEffect(() => {
  //   // 페이지 변경 시 상태 초기화
  //   setIsClicked(false);
  // }, [location]);

  return (
    <div className="relative">
      {/* 플로팅 메뉴 버튼 */}
      <button
        className={`fixed bottom-8 right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 ease-in-out ${isClicked ? 'rotate-45 bg-green-400' : 'bg-blue-500'}`}
        onClick={handleClick}
        aria-label={isClicked ? '작성 메뉴 닫힘' : '작성 메뉴 열림'}
      >
        <svg className="h-4 w-4 fill-white">
          <use href="/assets/sprite-sheet.svg#plus" />
        </svg>
      </button>

      {/* 추가 버튼들 */}
      {isClicked && (
        <div className="fixed bottom-24 right-2 flex flex-col">
          {/* 파티 모집하기 버튼 */}
          <button
            className="flex cursor-pointer items-center"
            onClick={navigateToPartyPage}
            aria-label="파티 모집 페이지로 이동"
          >
            <span className="text-sm text-black">파티 모집하기</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
              <svg className="h-4 w-4 fill-white">
                <use href="/assets/sprite-sheet.svg#collect" />
              </svg>
            </div>
          </button>

          {/* 커뮤니티 글쓰기 버튼 */}
          <button
            className="flex cursor-pointer items-center"
            onClick={navigateToCommunityPage}
            aria-label="포스트 작성 페이지로 이동"
          >
            <span className="text-sm text-black">포스트 작성하기</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
              <svg className="h-4 w-4 fill-white">
                <use href="/assets/sprite-sheet.svg#edit" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
});

export default FloatingMenu;
