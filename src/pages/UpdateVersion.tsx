import React from 'react';
import { Helmet } from 'react-helmet-async';

const UpdateVersion = () => {
  return (
    <>
      <Helmet>
        <title>최신버전 업데이트 | Shipmate</title>
        <meta name="description" content="최신버전 업데이트 페이지입니다." />
        <meta name="keywords" content="업데이트, 버전, 설정" />
      </Helmet>
      <div className="space-y-4 p-4 px-1 pt-1">
        <h2 className="mb-2 text-[1rem] font-bold">최신버전 업데이트</h2>
        <p className="text-[0.875rem]">최신버전 업데이트 페이지입니다.</p>
      </div>
    </>
  );
};

export default UpdateVersion;
