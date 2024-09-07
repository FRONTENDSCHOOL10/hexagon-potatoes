import { NavLink } from 'react-router-dom';

interface CommunityNavListProp {
  children: string;
  path: string;
}

const CommunityNavList = ({
  path,
  children,
}: CommunityNavListProp): JSX.Element => {
  return (
    <li className="text-body-1 text-gray-600">
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? 'border-b-[0.09375rem] border-mainblue pb-[0.125rem] font-[Pretendard] text-[1rem] font-bold not-italic text-[#020715]'
            : ''
        }
        end
      >
        {children}
      </NavLink>
    </li>
  );
};

export default CommunityNavList;
