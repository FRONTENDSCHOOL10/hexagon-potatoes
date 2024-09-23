import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Helmet } from 'react-helmet-async';

interface Keyword {
  rank: number;
  keyword: string;
  status: 'NEW' | 'UP' | 'DOWN';
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const navigate = useNavigate();

  const getFromLocal = (): string[] => {
    const history = localStorage.getItem('currentSearch');
    return history ? JSON.parse(history) : [];
  };

  const history = getFromLocal();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      navigate(`/home/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    setCurrentTime(formattedTime);
  }, []);

  const popularKeywords: Keyword[] = [
    { rank: 1, keyword: '스탠리', status: 'NEW' },
    { rank: 2, keyword: '아디다스', status: 'UP' },
    { rank: 3, keyword: '농담곰', status: 'DOWN' },
    { rank: 4, keyword: '미국', status: 'NEW' },
    { rank: 5, keyword: '일본', status: 'UP' },
    { rank: 6, keyword: '중국', status: 'NEW' },
    { rank: 7, keyword: '베이프', status: 'NEW' },
    { rank: 8, keyword: '과자', status: 'NEW' },
    { rank: 9, keyword: '립밤', status: 'NEW' },
    { rank: 10, keyword: '케이스', status: 'DOWN' },
  ];

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
      <section className="mt-3 pb-1">
        <h2 className="text-heading-1 text-black">최근 검색어</h2>
        {history.map((keyword: string, index: number) => (
          <button
            type="button"
            className="m-[.625rem] rounded-2xl bg-gray-100 px-3 font-body-1 text-base text-gray-300 focus:border-white focus:bg-mainblue focus:text-white"
            key={index}
            onClick={() => handleSearch(keyword)}
          >
            {keyword}
          </button>
        ))}
      </section>

      <section className="mt-3 h-56">
        <div className="flex items-center space-x-2 pb-4">
          <h2 className="text-heading-1 text-black">실시간 인기 검색어</h2>
          <p className="text-sm text-gray-200">{currentTime} 기준</p>
        </div>
        <ul>
          {popularKeywords.map((item) => (
            <button
              type="button"
              key={item.rank}
              className="flex items-center space-x-2 pb-4"
              onClick={() => handleSearch(item.keyword)}
            >
              <span className="font-bold text-body-1 text-black">{item.rank}</span>
              <span className="text-body-1 text-black">{item.keyword}</span>
              <span
                className={`text-body-2 ${
                  item.status === 'NEW'
                    ? 'text-searchpopularred'
                    : item.status === 'UP'
                    ? 'text-searchpopularred'
                    : 'text-mainblue'
                }`}
              >
                {item.status === 'NEW' ? 'NEW' : item.status === 'UP' ? '▲' : '▼'}
              </span>
            </button>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Search;
