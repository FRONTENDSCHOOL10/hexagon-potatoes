import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

// 홈페이지에서 쓰는 검색중 페이지로 이동하는 컴포넌트

const GoSearch = () => {
  return (
    <Link
      className="relative flex cursor-pointer flex-row items-center justify-end"
      to={'/home/search'}
    >
      <span className="inline-block w-full rounded-lg bg-gray-100 p-3 text-sub-2 font-semibold text-black text-gray-400 outline-mainblue">
        검색어를 입력해 주세요
      </span>
      <div className="absolute px-3">
        <svg className="size-7 fill-current">
          <use href="/assets/sprite-sheet.svg#search" />
        </svg>
      </div>
    </Link>
  );
};

export default GoSearch;
