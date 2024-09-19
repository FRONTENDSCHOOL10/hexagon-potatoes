import axios from 'axios';
import pb from '@/utils/pocketbase'; // PocketBase 인스턴스 import

const baseUrl = `${pb.baseUrl}/api/collections`;

async function getFieldValueByField(
  tableName: string,
  filterField: string,
  filterValue: string,
  returnField: string
): Promise<any> {
  try {
    const response = await axios.get(`${baseUrl}/${tableName}/records`, {
      params: {
        filter: `${filterField}~'=${filterValue}'`,
      },
    });

    const records = response.data.records;

    // 레코드가 없을 경우 처리
    if (!records || records.length === 0) {
      return false;
      // 예외를 던지려면 아래 코드 주석 해제
      // throw new Error(`레코드를 찾을 수 없습니다: ${filterField}=${filterValue}`);
    }

    return records[0][returnField]; // 첫 번째 레코드의 원하는 필드 값을 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 오류 발생:', error.message);
      console.error('응답 데이터:', error.response?.data);
      console.error('상태 코드:', error.response?.status);
    } else {
      console.warn('예상치 못한 오류 발생:', error);
    }
    throw error; // 오류를 다시 던져 호출자에게 알림
  }
}

export default getFieldValueByField;
