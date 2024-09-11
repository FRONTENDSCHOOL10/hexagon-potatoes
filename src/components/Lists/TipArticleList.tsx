import Article from './Article';
import DefaultProfileSVG from '../DefaultProfileSVG/DefaultProfileSVG';
import getPbImageURL from '@/utils/getPbImageURL';

interface TipArticleListProps {
  data: {
    type: 'tip'; // 항상 'tip'으로 설정
    title: string; // 팁 제목
    photo: string | null; // 팁 이미지 URL
    content: string; // 팁 내용
    author_photo: string; // 작성자의 프로필 사진 URL
    author_nickname: string; // 작성자의 닉네임
    id: string; // 팁의 식별자
    collectionId: string;
    expand?: {
      // 'expand' 속성 추가
      author_id?: {
        profile_photo: string | null;
      };
    };
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
  const defaultProfileImage = DefaultProfileSVG; // 기본 프로필 이미지 URL

  /**
   * 팁 데이터 배열을 처리하여, 이미지가 없는 경우 기본 이미지를 사용하도록 설정합니다.
   *
   * @param item - 팁 데이터 항목.
   * @returns 처리된 팁 데이터 항목.
   */

  const tipUrl = `https://hexagon-potatoes.pockethost.io`;

  // console.log(data);
  return (
    <ul className="flex w-full flex-col gap-y-3" aria-label="팁 목록">
      {data?.slice(0, 3).map((item, index) => (
        <Article
          key={item.id} // 리스트 항목에 대한 고유 키
          type={'tip'} // 'tip'으로 고정
          content_title={item.title} // 팁 제목
          content_img={
            item.photo ? getPbImageURL(tipUrl, item) : defaultTipImage
          } // 팁 이미지
          subtitle={item.content} // 팁 내용
          profile_photo={
            item?.expand?.author_id?.profile_photo
              ? getPbImageURL(tipUrl, item.expand?.author_id, 'profile_photo')
              : defaultProfileImage
          } // 작성자 프로필 사진
          nickname={item.expand?.author_id.nickname} // 작성자 닉네임
          id={item.id} // 팁 식별자
        />
      ))}
    </ul>
  );
};

export default TipArticleList;
