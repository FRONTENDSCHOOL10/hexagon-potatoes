import React from 'react';
import { Helmet } from 'react-helmet-async';

const BlockedUsers = () => {
  return (
    <>
      <Helmet>
        <title>차단 사용자 관리 | Shipmate</title>
        <meta name="description" content="차단 사용자 관리 페이지입니다." />
        <meta name="keywords" content="차단, 사용자, 관리" />
      </Helmet>
      <div className="space-y-4 p-4 px-1 pt-1">
        <h2 className="mb-2 text-[1rem] font-bold">차단 사용자 관리</h2>
        <p className="text-[0.875rem]">차단 사용자 관리 페이지입니다.</p>
      </div>
    </>
  );
};

export default BlockedUsers;
