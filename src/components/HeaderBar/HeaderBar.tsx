import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

interface PropTypes {
  type: 'back' | 'bell' | 'setting';
  title: string;
}

interface IconsPropTypes {
  type: 'back' | 'bell' | 'setting';
  navigate: ReturnType<typeof useNavigate>;
}

const handleBackClick = (navigate: ReturnType<typeof useNavigate>) => () => {
  navigate(-1);
};

const handleBellClick = (navigate: ReturnType<typeof useNavigate>) => () => {
  navigate('/home/notifications');
};

const handleSettingClick = (navigate: ReturnType<typeof useNavigate>) => () => {
  navigate('/home/setting');
};

const renderIcons = ({ type, navigate }: IconsPropTypes) => {
  switch (type) {
    case 'back':
      return (
        <button
          className="relative flex h-6 w-6 items-center justify-center text-black"
          onClick={handleBackClick(navigate)}
          aria-label="뒤로 가기"
          data-tooltip-id="backTooltip"
        >
          <svg className="h-4 w-4">
            <use href="/assets/sprite-sheet.svg#angleleft" />
          </svg>
          <Tooltip
            id="backTooltip"
            place="bottom"
            content="뒤로 가기"
            className="z-50"
            globalCloseEvents={{
              escape: true,
              scroll: false,
              resize: false,
              clickOutsideAnchor: false,
            }}
          />
        </button>
      );

    case 'bell':
      return (
        <button
          className="relative flex h-6 w-6 items-center justify-center text-black"
          onClick={handleBellClick(navigate)}
          aria-label="알림 페이지"
          data-tooltip-id="bellTooltip"
        >
          <svg className="h-4 w-4">
            <use href="/assets/sprite-sheet.svg#bell" />
          </svg>
          <Tooltip
            id="bellTooltip"
            place="bottom"
            content="알림 페이지"
            className="z-50"
            globalCloseEvents={{
              escape: true,
              scroll: false,
              resize: false,
              clickOutsideAnchor: false,
            }}
          />
        </button>
      );

    case 'setting':
      return (
        <div className="flex items-center gap-2">
          <button
            className="text-black"
            onClick={handleBellClick(navigate)}
            aria-label="알림 페이지"
            data-tooltip-id="bellTooltip"
          >
            <svg className="h-4 w-4">
              <use href="/assets/sprite-sheet.svg#bell" />
            </svg>
            <Tooltip
              id="bellTooltip"
              place="bottom"
              content="알림 페이지"
              className="z-50"
              globalCloseEvents={{
                escape: true,
                scroll: false,
                resize: false,
                clickOutsideAnchor: false,
              }}
            />
          </button>
          <button
            className="text-black"
            onClick={handleSettingClick(navigate)}
            aria-label="설정 페이지"
            data-tooltip-id="settingTooltip"
          >
            <svg className="h-4 w-4">
              <use href="/assets/sprite-sheet.svg#setting" />
            </svg>
            <Tooltip
              id="settingTooltip"
              place="bottom"
              content="설정 페이지"
              className="z-50"
              globalCloseEvents={{
                escape: true,
                scroll: false,
                resize: false,
                clickOutsideAnchor: false,
              }}
            />
          </button>
        </div>
      );

    default:
      return null;
  }
};

const HeaderBar = ({ type, title }: PropTypes) => {
  const navigate = useNavigate();

  const isBack = type === 'back';
  const icon = renderIcons({ type, navigate });

  return (
    <header className="relative z-[11] mb-3 flex w-[360px] items-center gap-2 px-2 py-3 shadow-[0px_0px_6px_0px_#0000001F]">
      {/* 뒤로가기 아이콘은 타이틀 앞으로 와야하고 */}
      {isBack && icon}
      <div className="flex-1 text-left text-xl text-black">{title}</div>
      {/* 다른 아이콘은 타이틀 뒤로 와야함 */}
      {!isBack && icon}
    </header>
  );
};

export default HeaderBar;
