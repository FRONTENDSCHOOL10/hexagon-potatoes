import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  const handleMovePage = () => {
    // 검색결과 페이지 주소로 수정
    navigate(`/${query}`);
  }
  
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  
  return (
    <>
      <label htmlFor="searchInput">검색</label>
      <input id="searchInput" onChange={handleChangeInput} value={query} type="text" placeholder="검색어를 입력해 주세요" />
      {/* 버튼 컴포넌트로 대체하기 */}
      <button onClick={handleMovePage}>검색!!</button>
    </>
  )
}

export default SearchBar;