// SearchResultPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const SearchResult = () => {
  const { keyword } = useParams();

  // 여기서 keyword를 사용하여 실제 검색 결과를 가져오는 로직을 구현합니다.

  return (
    <div>
      <h1>"{keyword}" 검색 결과</h1>
      {/* 검색 결과 목록을 여기에 렌더링합니다 */}
    </div>
  );
};

export default SearchResult;
