import axios from 'axios';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import getUserById from './getUserById';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';

const baseTipUrl = `${pb.baseUrl}/api/collections/tip/records`;

// getTip으로 팁 레코드들을 가져와서 랜덤으로 하나 선택하는 함수
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

const getTip = async () => {
  try {
    const response = await axios.get(baseTipUrl);
    const tips = response.data.items;

    const tipWithAuthors = await Promise.all(
      tips.map(async (tip: any) => {
        const tipImg = getTipImageUrl(tip);

        const authorData = tip.author_id
          ? await fetchAuthorData(tip.author_id)
          : null;

        // 팁 데이터 리스트. 각 팁은 ID, 제목, 사진 URL, 내용, 작성자 닉네임 및 사진을 포함
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

// 랜덤으로 하나의 팁을 반환하는 함수
const getTipRandom = async () => {
  try {
    const tips = await getTip();
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  } catch (error) {
    console.error('Error fetching random tip:', error);
    throw error;
  }
};
export default getTipRandom;
