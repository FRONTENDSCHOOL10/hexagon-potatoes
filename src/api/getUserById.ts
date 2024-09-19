import axios from 'axios';
import pb from '@/utils/pocketbase';
import getPbImageURL from '@/utils/getPbImageURL'; // getPbImageURL의 경로는 실제 경로로 수정하세요

const baseUrl = `${pb.baseUrl}api/collections/users/records`;

// 리더 정보를 가져오는 함수
async function getUserById(userId: string) {
  try {
    const response = await axios.get(`${baseUrl}/${userId}`);
    const user = response.data;
    return {
      ...user,
      profile_photo: user.profile_photo
        ? getPbImageURL(pb.baseUrl, user, 'profile_photo') // 이미지 URL 동적 생성
        : '', // 프로필 이미지가 없으면 기본 이미지로 설정
    };
  } catch (error) {
    console.error('사용자 정보를 가져오는 도중 오류가 발생했습니다:', error);
    throw error;
  }
}

export default getUserById;
