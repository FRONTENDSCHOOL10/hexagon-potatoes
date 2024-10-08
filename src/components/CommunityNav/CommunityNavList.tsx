import { memo } from 'react';
import { NavLink } from 'react-router-dom';

interface PropTypes {
  children: string;
  path: string;
}

const CommunityNavList = ({ path, children }: PropTypes) => {
  return (
    <li className="text-body-1 text-gray-600">
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? 'pretendard border-b-[0.09375rem] border-mainblue pb-[0.125rem] text-[1rem] font-bold not-italic text-[#020715]'
            : ''
        }
        end
      >
        {children}
      </NavLink>
    </li>
  );
};

export default memo(CommunityNavList);
