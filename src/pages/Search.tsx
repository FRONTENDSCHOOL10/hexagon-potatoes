// SearchPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Helmet } from 'react-helmet-async';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getFromLocal = () => {
    const history = localStorage.getItem('currentSearch');
    return history ? JSON.parse(history) : [];
  };
  const history = getFromLocal();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      navigate(`/home/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>검색 | Shipmate</title>
        <meta
          name="description"
          content="파티 이름이나 파티장의 닉네임 혹은 궁금한 국가를 검색해 보세요."
        />
        <meta name="keywords" content="검색, 상품, 정보, 인기 검색어" />
      </Helmet>
      <SearchBar />
      <section className="mt-3">
        <h2>최근 검색어</h2>
        {history.map((keyword: string, index: number) => {
          return (
            <button
              type="button"
              className="m-[.625rem] rounded-2xl bg-gray-100 px-3 font-body-1 text-base text-gray-300 focus:border-white focus:bg-mainblue focus:text-white"
              key={index}
              onClick={() => handleSearch(keyword)}
            >
              {keyword}
            </button>
          );
        })}
      </section>
      <section className="mt-3 h-56">
        <h2>실시간 인기 검색어</h2>
      </section>
    </>
  );
};

export default Search;
