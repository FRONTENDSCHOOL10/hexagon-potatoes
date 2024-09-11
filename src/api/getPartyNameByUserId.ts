import axios from 'axios';
import pb from '@/utils/pocketbase'; // PocketBase 인스턴스 import

const baseUrl = `${pb.baseUrl}/api/collections/party/records`;

// 사용자 ID를 통해 파티 이름을 조회하는 함수
async function getPartyNameByUserId(userId: string): Promise<string> {
  try {
    // 특정 필드의 값이 userId인 레코드를 조회
    const response = await axios.get(`${baseUrl}`, {
      params: {
        filter: `party_leader='${userId}'`,
      },
    });

    const records = response.data.items;

    if (records.length === 0) {
      throw new Error(
        `ID가 '${userId}'인 파티 리더가 속한 파티를 찾을 수 없습니다.`
      );
    }

    return records[0].party_name; // 첫 번째 레코드에서 party_name 필드의 값 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 요청 오류:', error.message);
      console.error('응답 데이터:', error.response?.data);
      console.error('상태 코드:', error.response?.status);
    } else {
      console.error('예상치 못한 오류 발생:', error);
    }
    throw error;
  }
}

export default getPartyNameByUserId;
