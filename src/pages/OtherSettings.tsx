import React from 'react';
import { Helmet } from 'react-helmet-async';

const OtherSettings = () => {
  return (
    <>
      <Helmet>
        <title>기타 설정 | Shipmate</title>
        <meta name="description" content="기타 설정 페이지입니다." />
        <meta name="keywords" content="기타, 설정" />
      </Helmet>
      <div className="space-y-4 p-4 px-1 pt-1">
        <h2 className="mb-2 text-[1rem] font-bold">기타 설정</h2>
        <p className="text-[0.875rem]">기타 설정 페이지입니다.</p>
      </div>
    </>
  );
};

export default OtherSettings;
