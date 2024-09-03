import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderBarProps {
  type: 'back' | 'bell' | 'setting';
  title: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ type, title }) => {
  // const navigate = useNavigate();

  const handleBackClick = () => {
    // navigate(-1); // 이전 페이지로 이동
  };

  const handleBellClick = () => {
    // navigate('/notifications'); // 알림 페이지로 이동
  };

  const handleSettingClick = () => {
    // navigate('/settings'); // 설정 페이지로 이동
  };

  const renderIcons = () => {
    switch (type) {
      case 'back':
        return (
          <button
            className="text-black relative w-6 h-6 flex items-center justify-center"
            onClick={handleBackClick}
            aria-label="뒤로 가기"
          >
            <svg className="w-4 h-4">
              <use href="public/assets/sprite-sheet.svg#angleleft" />
            </svg>
          </button>
        );

      case 'bell':
        return (
          <button
            className="text-black relative w-6 h-6 flex items-center justify-center"
            onClick={handleBellClick}
          >
            <svg className="w-4 h-4">
              <use href="public/assets/sprite-sheet.svg#bell" />
            </svg>
          </button>
        );
      case 'setting':
        return (
          <div className="flex items-center gap-2">
            <button className="text-black" onClick={handleBellClick}>
              <svg className="w-4 h-4">
                <use href="public/assets/sprite-sheet.svg#bell" />
              </svg>
            </button>
            <button className="text-black" onClick={handleSettingClick}>
              <svg className="w-4 h-4">
                <use href="public/assets/sprite-sheet.svg#setting" />
              </svg>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-[360px] items-center gap-2 px-2 py-3 relative">
      {type === 'back' && renderIcons()}
      <div className="flex-1 text-black text-xl text-left">{title}</div>
      {type !== 'back' && renderIcons()}
    </div>
  );
};

export default HeaderBar;
