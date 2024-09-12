import React from 'react';
import { Link } from 'react-router-dom';
import LabelList from '@/components/Label/LabelList';
import DefaultProfileSVG from '../DefaultProfileSVG/DefaultProfileSVG';

interface ArticleProps {
  level?: 2 | 3 | 4 | 5 | 6;
  type?: 'party' | 'tip'; // 아티클의 유형. 기본값은 'party'
  content_title: string; // 아티클 제목
  content_img?: string; // 아티클 이미지 URL
  subtitle: string; // 아티클의 부제목
  profile_photo: string | React.ComponentType<{ size: number }>; // 프로필 사진 URL 또는 컴포넌트
  nickname?: string; // 작성자의 닉네임
  id?: string; // 'party' 또는 'tip' 아티클의 식별자
  label?: string[];
}

const Article = ({
  level = 2,
  type = 'party',
  content_title = '',
  content_img = '',
  subtitle = '',
  profile_photo,
  nickname = '',
  id,
  label,
}: ArticleProps) => {
  const Heading: React.ElementType = `h${level}`;
  const getLink = () => {
    if (type === 'party' && id) {
      return `/home/party/${id}`;
    } else if (type === 'tip' && id) {
      return `/home/community/tip/${id}`;
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
          alt={type === 'party' ? '파티' : '팁'} // 이미지에 대한 대체 텍스트
          className="h-28 w-20 rounded-lg object-cover"
        />
        <div role="group" className="flex min-w-0 flex-col">
          <Heading className="mb-[0.19rem] w-full overflow-hidden text-ellipsis whitespace-nowrap text-sub-1">
            {content_title}
          </Heading>
          <p className="mb-[0.38rem] w-full truncate text-sub-2 text-gray-300">
            {subtitle}
          </p>
          <LabelList data={label} />
          {/* 라벨 리스트 컴포넌트. 현재는 빈 데이터 */}
          <div className="flex items-center py-[0.25rem]">
            <div className="mr-2 inline-block h-5 w-5">
              {typeof profile_photo === 'string' ? (
                <img
                  className="h-full w-full overflow-hidden rounded-full object-cover" // 이미지 스타일 설정
                  src={profile_photo} // 작성자의 프로필 사진
                  alt="사용자 프로필" // 이미지에 대한 대체 텍스트
                />
              ) : (
                <>
                  <DefaultProfileSVG size={20} />
                </>
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
