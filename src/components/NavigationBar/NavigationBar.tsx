import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import FloatingMenu from './FloatingMenu';
import { Tooltip } from 'react-tooltip';

const NavigationBar = memo(() => {
  return (
    <nav
      className="relative flex h-[50px] w-[360px] items-center bg-white shadow-[0px_0px_15px_0px_#0A73F926]"
      aria-label="내비게이션 메뉴"
    >
      {/* 홈 */}
      <NavLink
        to="/home"
        end
        className={({ isActive }) =>
          `flex flex-1 items-center justify-center ${
            isActive ? 'text-[#0A73F9]' : 'text-[#CAD4E7]'
          }`
        }
        data-tooltip-id="homeTooltip"
      >
        <span className="sr-only">홈</span>
        <svg className="h-[1.5625rem] w-[1.5625rem] fill-current">
          <use href="/assets/sprite-sheet.svg#home  " />
        </svg>
        <Tooltip id="homeTooltip" place="top" content="홈" />
      </NavLink>

      {/* 채팅홈 */}
      <NavLink
        to="/home/chatHome"
        className={({ isActive }) =>
          `flex flex-1 items-center justify-center ${
            isActive ? 'text-[#0A73F9]' : 'text-[#CAD4E7]'
          }`
        }
        data-tooltip-id="chatTooltip"
      >
        <span className="sr-only">채팅</span>
        <svg className="h-[1.5625rem] w-[1.5625rem] fill-current">
          <use href="/assets/sprite-sheet.svg#chat" />
        </svg>
        <Tooltip id="chatTooltip" place="top" content="채팅" />
      </NavLink>

      {/* 커뮤니티 */}
      <NavLink
        to="/home/community"
        className={({ isActive }) =>
          `flex flex-1 items-center justify-center ${
            isActive ? 'text-[#0A73F9]' : 'text-[#CAD4E7]'
          }`
        }
        data-tooltip-id="communityTooltip"
      >
        <span className="sr-only">커뮤니티</span>
        <svg className="h-[1.5625rem] w-[1.5625rem] fill-current">
          <use href="/assets/sprite-sheet.svg#comment" />
        </svg>
        <Tooltip id="communityTooltip" place="top" content="커뮤니티" />
      </NavLink>

      {/* 마이페이지 */}
      <NavLink
        to="/home/mypage"
        className={({ isActive }) =>
          `flex flex-1 items-center justify-center ${
            isActive ? 'text-[#0A73F9]' : 'text-[#CAD4E7]'
          }`
        }
        data-tooltip-id="mypageTooltip"
      >
        <span className="sr-only">마이페이지</span>
        <svg className="h-[1.5625rem] w-[1.5625rem] fill-current">
          <use href="/assets/sprite-sheet.svg#user" />
        </svg>
        <Tooltip
          id="mypageTooltip"
          place="top"
          content="마이페이지"
          className="z-50"
        />
      </NavLink>

      {/* 플로팅 버튼 */}
      <div className="absolute bottom-6 right-2 -translate-y-1/2 transform">
        <FloatingMenu />
      </div>
    </nav>
  );
});

export default NavigationBar;
