import axios from 'axios';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import getUserById from './getUserById';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';

const baseTipUrl = `${pb.baseUrl}api/collections/tip/records`;

// getUserById로 팁 레코드에 있는 userid를 가지고 유저 컬렉션에 가서 닉네임 가져와서 넣어줌
// getPbImageURL 써서 이미지 링크 전달 + 팁에 이미지 없으면 기본 이미지 반영하도록 해둠
// 아티클에 쓰일 정보들 가져다주는 함수

const getTipImageUrl = (tip: any): string => {
  return tip.photo ? getPbImageURL(pb.baseUrl, tip, 'photo') : '';
};

const fetchAuthorData = async (authorId: string) => {
  try {
    const author = await getUserById(authorId);
    return author;
  } catch (error) {
    console.error(
      `Failed to fetch author data for author ID ${authorId}`,
      error
    );
    return null;
  }
};

export const getTip = async () => {
  try {
    const response = await axios.get(baseTipUrl);
    const tips = response.data.items;

    const tipWithAuthors = await Promise.all(
      tips.map(async (tip: any) => {
        const tipImg = getTipImageUrl(tip);

        const authorData = tip.author_id
          ? await fetchAuthorData(tip.author_id)
          : null;

        //팁 데이터 리스트. 각 팁은 ID, 제목, 사진 URL, 내용, 작성자 닉네임 및 사진을 포함
        return {
          id: tip.id,
          title: tip.title,
          photo: tipImg,
          content: tip.content,
          author_nickname: authorData?.nickname || '',
          author_photo: authorData?.profile_photo || DefaultProfileSVG,
          type: 'tip',
        };
      })
    );

    return tipWithAuthors;
  } catch (error) {
    console.error('Error fetching tips:', error);
    throw error;
  }
};
