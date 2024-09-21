import React, { useState, useEffect, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

interface PropTypes {
  isClicked: boolean;
  onClick: () => void;
}

const FloatingMenu = memo(({ isClicked, onClick }: PropTypes) => {
  const navigate = useNavigate();

  const navigateToPartyPage = () => {
    navigate('/home/partyCollect');
  };

  const navigateToCommunityPage = () => {
    navigate('/home/writepost');
  };

  const popBtnStyle = {
    base: 'flex items-center gap-2 ',
    icon: 'flex h-12 w-12 items-center justify-center rounded-full bg-blue-500',
    svg: 'h-4 w-4 fill-current text-white',
    text: 'font-sub-1 text-[1rem] font-semibold text-white ',
  };

  return (
    <>
      {/* 플로팅 메뉴 버튼 */}
      <button
        className={`absolute bottom-8 right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 ease-in-out ${isClicked ? 'rotate-45 bg-green-400' : 'bg-blue-500'} shadow-[0px_0px_15px_0px_#0A73F926]`}
        onClick={onClick}
        aria-label={isClicked ? '작성 메뉴 열림' : '작성 메뉴 닫힘'}
        data-tooltip-id="writeTooltip"
        type="button"
      >
        <svg className="h-4 w-4 fill-current text-white">
          <use href="/assets/sprite-sheet.svg#plus" />
        </svg>
      </button>
      <Tooltip
        id="writeTooltip"
        place="left"
        content="글 작성하기"
        globalCloseEvents={{
          escape: true,
          scroll: false,
          resize: false,
          clickOutsideAnchor: false,
        }}
      />
      {/* 추가 버튼들 */}
      {isClicked && (
        <div className="absolute bottom-24 right-2 flex w-[10.125rem] flex-col items-end gap-2">
          {/* 파티 모집하기 버튼 */}
          <button
            className={popBtnStyle.base}
            onClick={navigateToPartyPage}
            aria-label="파티 모집하기"
            type="button"
          >
            <p className={popBtnStyle.text}>파티 모집하기</p>
            <div className={popBtnStyle.icon}>
              <svg className={popBtnStyle.svg}>
                <use href="/assets/sprite-sheet.svg#collect" />
              </svg>
            </div>
          </button>
          {/* 커뮤니티 글쓰기 버튼 */}
          <button
            className={popBtnStyle.base}
            onClick={navigateToCommunityPage}
            aria-label="포스트 작성하기"
            type="button"
          >
            <p className={popBtnStyle.text}>포스트 작성하기</p>
            <div className={popBtnStyle.icon}>
              <svg className={popBtnStyle.svg}>
                <use href="/assets/sprite-sheet.svg#edit" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </>
  );
});

export default FloatingMenu;
