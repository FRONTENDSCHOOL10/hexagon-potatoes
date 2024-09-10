// SearchPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar/SearchBar';

// 검색하는 페이지

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <SearchBar />
      <section className="mt-3 h-28">
        <h2>최근 검색어</h2>
      </section>
      <section className="mt-3 h-56">
        <h2>실시간 인기 검색어</h2>
      </section>
    </div>
  );
};

export default Search;
