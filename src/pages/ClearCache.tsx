import React from 'react';
import { Helmet } from 'react-helmet-async';

const ClearCache = () => {
  return (
    <>
      <Helmet>
        <title>캐시 삭제 | Shipmate</title>
        <meta name="description" content="캐시 데이터 삭제하기 페이지입니다." />
        <meta name="keywords" content="캐시, 삭제, 설정" />
      </Helmet>
      <div className="space-y-4 p-4 px-1 pt-1">
        <h2 className="mb-2 text-[1rem] font-bold">캐시 데이터 삭제하기</h2>
        <p className="text-[0.875rem]">캐시 데이터 삭제하기 페이지입니다.</p>
      </div>
    </>
  );
};

export default ClearCache;
