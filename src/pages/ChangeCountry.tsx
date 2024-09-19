import React from 'react';
import { Helmet } from 'react-helmet-async';

const ChangeCountry = () => {
  return (
    <>
      <Helmet>
        <title>국가 변경 | Shipmate</title>
        <meta name="description" content="국가 변경 페이지입니다." />
        <meta name="keywords" content="국가, 변경, 설정" />
      </Helmet>
      <div className="space-y-4 p-4 px-1 pt-1">
        <h2 className="mb-2 text-[1rem] font-bold">국가 변경</h2>
        <p className="text-[0.875rem]">국가 변경 페이지입니다.</p>
      </div>
    </>
  );
};

export default ChangeCountry;
