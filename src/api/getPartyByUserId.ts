import axios from 'axios';
import pb from '@/utils/pocketbase'; // PocketBase 인스턴스 import

const baseUrl = `${pb.baseUrl}/api/collections/party/records`;

// 사용자 ID를 통해 파티 레코드 정보를 조회하는 함수
async function getPartyByUserId(userId: string): Promise<any[]> {
  try {
    // 특정 필드의 값이 userId인 레코드를 조회
    const response = await axios.get(`${baseUrl}`, {
      params: {
        filter: `party_leader='${userId}'`,
      },
    });

    const records = response.data.items;

    if (records.length === 0) {
      console.warn(`사용자 ID '${userId}'에 해당하는 파티를 찾을 수 없습니다.`);
      return []; // 빈 배열 반환
    }

    return records; // 모든 레코드 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 오류 발생:', error.message);
      console.error('응답 데이터:', error.response?.data);
      console.error('상태 코드:', error.response?.status);
    } else {
      console.error('예상치 못한 오류 발생:', error);
    }
    throw error; // 오류를 던져서 호출한 쪽에서 처리할 수 있도록 함
  }
}

export default getPartyByUserId;
