import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleMovePage = () => {
    // 검색결과 페이지 주소로 수정
    navigate(`/${query}`);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <section className="relative flex flex-row items-center justify-end">
      <label htmlFor="searchInput" className="sr-only">
        검색
      </label>
      <input
        className="inline-block w-full rounded-lg bg-gray-100 p-3 text-sub-2 text-black outline-mainblue"
        id="searchInput"
        onChange={handleChangeInput}
        value={query}
        type="text"
        placeholder="검색어를 입력해 주세요"
      />
      <button className="absolute px-3" onClick={handleMovePage}>
        <svg className="size-7 fill-current">
          <use href="/assets/sprite-sheet.svg#search" />
        </svg>
      </button>
    </section>
  );
};

export default SearchBar;
