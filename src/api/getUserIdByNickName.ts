import axios from 'axios';
import pb from '@/utils/pocketbase';

const baseUrl = `${pb.baseUrl}/api/collections/users/records`;

// 사용자 이름으로 사용자 ID를 조회하는 함수
async function getUserIdByNickName(nickname: string): Promise<string> {
  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        filter: `nickname='${nickname}'`, // nickname 필드를 필터링
      },
    });

    const users = response.data.items;

    if (users.length === 0) {
      throw new Error(`닉네임 '${nickname}'을 가진 사용자를 찾을 수 없습니다.`);
    }

    return users[0].id; // 첫 번째 사용자 레코드의 ID 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 오류 발생:', error.message);
      console.error('응답 데이터:', error.response?.data);
      console.error('상태 코드:', error.response?.status);
    } else {
      console.error('예상치 못한 오류 발생:', error);
    }
    throw error;
  }
}

export default getUserIdByNickName;
