import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavigationBar = () => {
  return (
    <nav className="flex w-[360px] h-[50px] items-center relative shadow-[0px_0px_15px_0px_#0A73F926] bg-white">
      {/* 홈 */}
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `flex-1 flex justify-center items-center ${
            isActive ? 'text-[#0A73F9]' : 'text-[#CAD4E7]'
          }`
        }
      >
        <svg
          className="w-[1.5625rem] h-[1.5625rem]"
          aria-label="홈"
          fill="currentColor"
        >
          <use href="/assets/sprite-sheet.svg#home" />
        </svg>
      </NavLink>
      {/* 채팅 */}
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          `flex-1 flex justify-center items-center ${
            isActive ? 'text-[#0A73F9]' : 'text-[#CAD4E7]'
          }`
        }
      >
        <svg
          className="w-[1.5625rem] h-[1.5625rem]"
          aria-label="채팅"
          fill="currentColor"
        >
          <use href="/assets/sprite-sheet.svg#chat" />
        </svg>
      </NavLink>
      {/* 커뮤니티 */}
      <NavLink
        to="/community"
        className={({ isActive }) =>
          `flex-1 flex justify-center items-center ${
            isActive ? 'text-[#0A73F9]' : 'text-[#CAD4E7]'
          }`
        }
      >
        <svg
          className="w-[1.5625rem] h-[1.5625rem]"
          aria-label="커뮤니티"
          fill="currentColor"
        >
          <use href="/assets/sprite-sheet.svg#comment" />
        </svg>
      </NavLink>
      {/* 마이페이지 */}
      <NavLink
        to="/mypage"
        className={({ isActive }) =>
          `flex-1 flex justify-center items-center ${
            isActive ? 'text-[#0A73F9]' : 'text-[#CAD4E7]'
          }`
        }
      >
        <svg
          className="w-[1.5625rem] h-[1.5625rem]"
          aria-label="마이페이지"
          fill="currentColor"
        >
          <use href="/assets/sprite-sheet.svg#user" />
        </svg>
      </NavLink>
    </nav>
  );
};

export default NavigationBar;
