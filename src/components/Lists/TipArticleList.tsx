import React from 'react';
import Article from './Article';

interface TipArticleListProps {
  data: {
    type: 'tip'; // 항상 'tip'으로 설정
    title: string; // 팁 제목
    photo: string; // 팁 이미지 URL
    content: string; // 팁 내용
    author_photo: string; // 작성자의 프로필 사진 URL
    author_nickname: string; // 작성자의 닉네임
    id: string; // 팁의 식별자
  }[];
}

/**
 * TipArticleList 컴포넌트는 팁 목록을 렌더링합니다.
 *
 * @param data - 팁 데이터 배열. 각 팁은 'tip' 타입을 가지며, 제목, 이미지, 내용, 작성자 정보 등을 포함합니다.
 *
 * @returns JSX 요소로 구성된 팁 목록.
 */
const TipArticleList = ({ data }: TipArticleListProps) => {
  const defaultTipImage = '/assets/shipmatelogo.png'; // 기본 팁 이미지 URL
  const defaultProfileImage = '/assets/shipmatelogo.png'; // 기본 프로필 이미지 URL

  /**
   * 팁 데이터 배열을 처리하여, 이미지가 없는 경우 기본 이미지를 사용하도록 설정합니다.
   *
   * @param item - 팁 데이터 항목.
   * @returns 처리된 팁 데이터 항목.
   */
  const processedData = data.map((item) => ({
    ...item,
    photo: item.photo || defaultTipImage, // 팁 이미지가 없으면 기본 이미지 사용
    author_photo: item.author_photo || defaultProfileImage, // 작성자 프로필 이미지가 없으면 기본 이미지 사용
  }));

  return (
    <div>
      <ul className="flex flex-col gap-y-3" aria-label="팁 목록">
        {processedData.map((item, index) => (
          <Article
            key={index} // 리스트 항목에 대한 고유 키
            type={item.type} // 'tip'으로 고정
            content_title={item.title} // 팁 제목
            content_img={item.photo} // 팁 이미지
            subtitle={item.content} // 팁 내용
            profile_photo={item.author_photo} // 작성자 프로필 사진
            nickname={item.author_nickname} // 작성자 닉네임
            id={item.id} // 팁 식별자
          />
        ))}
      </ul>
    </div>
  );
};

export default TipArticleList;
