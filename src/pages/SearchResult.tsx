import ArticleList from '@/components/Lists/ArticleList';
import React from 'react';

const SearchResult = () => {
  const data = [
    {
      party_name: '파티 이름',
      partyImg: '/path/to/image.jpg',
      partyImgAlt: '파티의 이미지 설명',
      party_about: '파티 소개',
      profile_photo: '/path/to/profile.jpg',
      leaderImgAlt: '파티장 프로필 이미지',
      nickname: '파티장',
    },
    // 더 많은 데이터
  ];

  return (
    <div>
      <ArticleList data={data} headingId="search-results-heading" />
    </div>
  );
};

export default SearchResult;

//아티클 리스트 이렇게 바꿔야됨
// import React from 'react';
// import Article from './Article';

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
