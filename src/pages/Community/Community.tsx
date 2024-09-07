import CommunityNav from '@/components/CommunityNav/CommunityNav';
import { Outlet } from 'react-router-dom';

const Community = () => {
  return (
    <div>
      <CommunityNav />
      <Outlet />
    </div>
  );
};

export default Community;
