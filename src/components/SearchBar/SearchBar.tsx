import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const getFromLocal = () => {
    const history = localStorage.getItem('currentSearch');
    return history ? JSON.parse(history) : [];
  };
  const saveToLocal = (history: string[]) => {
    localStorage.setItem('currentSearch', JSON.stringify(history));
  };

  const handleMovePage = () => {
    if (query.trim()) {
      const history = getFromLocal();
      if (!history.includes(query)) {
        history.push(query);
        saveToLocal(history);
      }
      navigate(`/home/search/${query}`);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMovePage();
    }
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
        onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
        value={query}
        type="text"
        placeholder="검색어를 입력해 주세요"
      />
      <button
        className="absolute px-3"
        onClick={handleMovePage} // 버튼 클릭 이벤트 처리
      >
        <svg className="size-7 fill-current">
          <use href="/assets/sprite-sheet.svg#search" />
        </svg>
      </button>
    </section>
  );
};

export default SearchBar;
