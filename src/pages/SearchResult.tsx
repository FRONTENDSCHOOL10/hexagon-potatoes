import React, { useState, useEffect } from 'react';
import ArticleList from '@/components/Lists/ArticleList'; // ArticleList의 경로는 실제 경로로 수정하세요
import getPartyByKeyword from '@/api/getPartyByKeyword'; // getPartyByKeyword의 경로는 실제 경로로 수정하세요

const SearchResult = () => {
  const [partyList, setPartyList] = useState<any[]>([]); // 타입을 실제 데이터에 맞게 수정하세요
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const keyword = '파티'; // 이 키워드는 실제 검색 키워드로 대체해야 합니다

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const data = await getPartyByKeyword(keyword);
        setPartyList(data.items); // data.items는 실제 데이터 형식에 맞게 수정해야 합니다
      } catch (err) {
        setError('파티 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [keyword]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{keyword} 검색 결과</h1>
      <ArticleList data={partyList} headingId="search-results-heading" />
    </div>
  );
};

export default SearchResult;

//아티클 리스트 이렇게 바꿔야됨
// import React from 'react';
// import Article from './Article';
// import { ArticleList } from '@/components/Lists/ArticleList';

// const ArticleList = ({ data, headingId }) => {
//   return (
//     <div>
//       {/* 헤딩 추가 */}
//       <h2 id={headingId} className="font-heading-1 text-[1.25rem]">
//         검색 결과
//       </h2>
//       {/* aria-labelledby를 통해 헤딩과 연결 */}
//       <ul className="flex flex-col gap-y-3" aria-labelledby={headingId}>
//         {/* 데이터 전달 */}
//         {data.map((d, index) => (
//           <Article key={index} {...d} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ArticleList;
