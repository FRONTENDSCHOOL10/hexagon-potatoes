import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import { useHeaderConfig } from '../hooks/useHeaderConfig';

const RootLayout: React.FC = () => {
  const location = useLocation();
  const { headerProps, showNavigationBar } = useHeaderConfig(location.pathname);

  return (
    <div>
      <HeaderBar {...headerProps} />
      <main>
        <Outlet />
        {showNavigationBar && <NavigationBar />}
      </main>
    </div>
  );
};

export default RootLayout;
