import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

interface HeaderBarProps {
  type: 'back' | 'bell' | 'setting';
  title: string;
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

const renderIcons = (
  type: string,
  navigate: ReturnType<typeof useNavigate>
) => {
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
            </svg>{' '}
            <Tooltip
              id="bellTooltip"
              place="bottom"
              content="알림 페이지"
              className="z-50"
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
            />
          </button>
        </div>
      );
    default:
      return null;
  }
};

const HeaderBar: React.FC<HeaderBarProps> = ({ type, title }) => {
  const navigate = useNavigate();

  return (
    <header className="relative flex w-[360px] items-center gap-2 px-2 py-3">
      {type === 'back' && renderIcons(type, navigate)}
      <div className="flex-1 text-left text-xl text-black">{title}</div>
      {type !== 'back' && renderIcons(type, navigate)}
    </header>
  );
};

export default HeaderBar;
