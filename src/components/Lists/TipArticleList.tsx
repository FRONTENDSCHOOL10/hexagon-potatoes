import Article from './Article';
import DefaultProfileSVG from '../DefaultProfileSVG/DefaultProfileSVG';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';

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

const TipArticleList = ({ data }: PropTypes) => {
  const defaultTipImage = '/assets/shipmatelogo.webp'; // 기본 팁 이미지 URL
  const defaultProfileImage = DefaultProfileSVG; // 기본 프로필 이미지 URL

  const url = `${pb.baseUrl}`;

  console.log(data);
  return (
    <ul className="flex w-full flex-col gap-y-3" aria-label="팁 목록">
      {data?.map((item, index) => (
        <Article
          key={item.id} // 리스트 항목에 대한 고유 키
          type={'tip'} // 'tip'으로 고정
          content_title={item.title} // 팁 제목
          content_img={item.photo ? getPbImagesURL(0, item) : defaultTipImage} // 팁 이미지
          subtitle={item.content} // 팁 내용
          profile_photo={
            item?.expand?.author_id?.profile_photo
              ? getPbImageURL(url, item.expand?.author_id, 'profile_photo')
              : defaultProfileImage
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

export default TipArticleList;
