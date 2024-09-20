import axios from 'axios';
import pb from '@/utils/pocketbase';

const baseUrl = `${pb.baseUrl}api/collections/party/records`;

// 사용자가 파티를 가지고 있는지 먼저 확인하는 함수
async function checkUserHasParty(userId: string): Promise<boolean> {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        filter: `party_leader='${userId}'`,
        fields: 'id', // 필요한 필드만 요청
        limit: 1, // 하나의 결과만 요청
      },
    });

    return response.data.items.length > 0;
  } catch (error) {
    console.error('파티 확인 중 오류 발생:', error);
    throw error;
  }
}

// 사용자 ID를 통해 파티 레코드 정보를 조회하는 함수
async function getPartyByUserId(
  userId: string
): Promise<{ success: boolean; data: any[] | string }> {
  try {
    const hasParty = await checkUserHasParty(userId);

    if (!hasParty) {
      return { success: false, data: '파티가 없습니다.' };
    }

    // 파티가 있는 경우에만 전체 정보를 요청
    const response = await axios.get(baseUrl, {
      params: {
        filter: `party_leader='${userId}'`,
      },
    });

    return { success: true, data: response.data.items };
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

export default getPartyByUserId;
