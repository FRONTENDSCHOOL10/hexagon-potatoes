import React from 'react';
import { Link } from 'react-router-dom';
import LabelList from '@/components/Label/LabelList';

interface ArticleProps {
  type?: 'party' | 'tip'; // 아티클의 유형. 기본값은 'party'
  content_title: string; // 아티클 제목
  content_img: string; // 아티클 이미지 URL
  subtitle: string; // 아티클의 부제목
  profile_photo: string | React.ComponentType<{ size: number }>; // 프로필 사진 URL 또는 컴포넌트
  nickname: string; // 작성자의 닉네임
  id?: string; // 'party' 또는 'tip' 아티클의 식별자
}

/**
 * Article 컴포넌트는 아티클의 정보를 표시하는 UI 컴포넌트입니다.
 *
 * @param type - 아티클의 유형 ('party' 또는 'tip'). 기본값은 'party'.
 * @param content_title - 아티클의 제목.
 * @param content_img - 아티클에 표시될 이미지의 URL.
 * @param subtitle - 아티클의 부제목.
 * @param profile_photo - 작성자의 프로필 사진 URL 또는 컴포넌트.
 * @param nickname - 작성자의 닉네임.
 * @param id - 아티클의 식별자. 링크를 생성하는 데 사용됩니다.
 *
 * @returns JSX 요소로 구성된 아티클 리스트 항목.
 */
const Article = ({
  type = 'party',
  content_title = '',
  content_img = '',
  subtitle = '',
  profile_photo,
  nickname = '',
  id,
}: ArticleProps) => {
  /**
   * 아티클의 유형에 따라 링크를 생성합니다.
   *
   * @returns 생성된 링크 URL.
   */
  const getLink = () => {
    if (type === 'party' && id) {
      return `/home/party/${id}`;
    } else if (type === 'tip' && id) {
      return `/community/tip/${id}`;
    }
    return '/'; // 링크가 정의되지 않았을 경우 기본값 설정
  };

  return (
    <li className="list-none border-b border-b-gray-100 p-2">
      <Link
        to={getLink()} // 링크를 설정합니다.
        className="flex flex-row items-center gap-3 leading-tight"
      >
        <img
          src={content_img} // 아티클의 이미지
          alt={type === 'party' ? '파티 이미지' : '팁 이미지'} // 이미지에 대한 대체 텍스트
          className="h-28 w-20 object-cover"
        />
        <div role="group">
          <span aria-label="제목" className="text-sub-1">
            {content_title}
          </span>
          <p className="text-sub-2 text-gray-300">{subtitle}</p>
          <LabelList data={[]} /> {/* 라벨 리스트 컴포넌트. 현재는 빈 데이터 */}
          <div className="flex items-center">
            <div className="mr-2 inline-block h-5 w-5">
              {typeof profile_photo === 'string' ? (
                <img
                  className="h-full w-full object-cover" // 이미지 스타일 설정
                  src={profile_photo} // 작성자의 프로필 사진
                  alt="사용자 프로필 사진" // 이미지에 대한 대체 텍스트
                />
              ) : (
                React.createElement(profile_photo, { size: 20 }) // 프로필 사진이 컴포넌트일 경우 렌더링
              )}
            </div>
            <span className="align-middle text-caption">{nickname}</span>
          </div>
          {/* 작성자의 닉네임 */}
        </div>
      </Link>
    </li>
  );
};

export default Article;
