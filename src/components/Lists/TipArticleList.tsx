import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import { memo } from 'react';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import Article from './Article';

interface PropTypes {
  data: {
    type: 'tip'; // 항상 'tip'으로 설정
    title: string; // 팁 제목
    photo: string | null; // 팁 이미지 URL
    content: string; // 팁 내용
    author_photo: string; // 작성자의 프로필 사진 URL
    author_nickname: string; // 작성자의 닉네임
    id: string; // 팁의 식별자
    collectionId: string;
    tag: string[];
    expand?: {
      // 'expand' 속성 추가
      author_id?: {
        profile_photo: string | null;
        collectionId: string;
        nickname: string;
        id: string;
      };
    };
  }[];
}

const url = `${pb.baseUrl}`;

const TipArticleList = ({ data }: PropTypes) => {
  return (
    <ul className="flex w-full flex-col gap-y-3" aria-label="팁 목록">
      {data?.map((item) => (
        <Article
          key={item.id} // 리스트 항목에 대한 고유 키
          type={'tip'} // 'tip'으로 고정
          content_title={item.title} // 팁 제목
          content_img={item.photo ? getPbImagesURL(0, item) : DefaultProfileSVG} // 팁 이미지
          subtitle={item.content} // 팁 내용
          profile_photo={
            item?.expand?.author_id?.profile_photo
              ? getPbImageURL(url, item.expand?.author_id, 'profile_photo')
              : DefaultProfileSVG
          } // 작성자 프로필 사진
          nickname={item.expand?.author_id?.nickname} // 작성자 닉네임
          id={item.id} // 팁 식별자
          label={item.tag}
          level={3}
        />
      ))}
    </ul>
  );
};

export default memo(TipArticleList);
