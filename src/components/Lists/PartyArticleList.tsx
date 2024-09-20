import React from 'react';
import Article from './Article';
import DefaultProfileSVG from '../DefaultProfileSVG/DefaultProfileSVG';

interface PropTypes {
  data: {
    type?: 'party' | 'tip';
    party_name: string;
    partyImg: string;
    party_about: string;
    leader_photo: string;
    leader_nickname: string;
    party_id?: string;
    id?: string;
  }[];
}

const PartyArticleList = ({ data }: PropTypes) => {
  const defaultPartyImage = '/assets/shipmatelogo.webp';
  const defaultProfileImage = DefaultProfileSVG;

  const processedData = data.map((item) => ({
    ...item,
    partyImg: item.partyImg || defaultPartyImage,
    leader_photo: item.leader_photo || defaultProfileImage,
  }));

  return (
    <div>
      <ul className="flex flex-col gap-y-3" aria-label="파티 리스트">
        {processedData.map((item, index) => (
          <Article
            key={index}
            type={item.type}
            content_title={item.party_name}
            content_img={item.partyImg}
            subtitle={item.party_about}
            profile_photo={item.leader_photo}
            nickname={item.leader_nickname}
            id={item.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default PartyArticleList;
