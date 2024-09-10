import React from 'react';
import Article from './Article';

interface ArticleListProps {
  data: {
    type?: 'party' | 'tip'; // 'party' 또는 'tip' 타입 구분
    party_name: string;
    partyImg: string;
    partyImgAlt: string;
    party_about: string;
    profile_photo: string;
    leaderImgAlt: string;
    nickname: string;
    party_id?: string; // 'party' 타입일 경우에만 사용
    tipId?: string; // 'tip' 타입일 경우에만 사용
  }[];
  headingId: string; // 헤딩 아이디
}

const ArticleList = ({ data, headingId }: ArticleListProps) => {
  return (
    <div>
      {/* <h2 id={headingId} className="mb-4 text-xl font-bold">
        목록 제목
      </h2> */}
      <ul aria-labelledby={headingId} className="flex flex-col gap-y-3">
        {data.map((item, index) => (
          <Article
            key={index}
            type={item.type}
            party_name={item.party_name}
            partyImg={item.partyImg}
            partyImgAlt={item.partyImgAlt}
            party_about={item.party_about}
            profile_photo={item.profile_photo}
            leaderImgAlt={item.leaderImgAlt}
            nickname={item.nickname}
            party_id={item.type === 'party' ? item.party_id : undefined}
            tipId={item.type === 'tip' ? item.tipId : undefined}
          />
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
