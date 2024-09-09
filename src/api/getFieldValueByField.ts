import axios from 'axios';
import pb from '@/utils/pocketbase'; // PocketBase 인스턴스 import

const baseUrl = `${pb.baseUrl}/api/collections`;

// 테이블에서 특정 필드의 값이 특정 값인 레코드를 찾아서 다른 필드 값을 반환하는 함수
async function getFieldValueByField(
  tableName: string,
  filterField: string,
  filterValue: string,
  returnField: string
): Promise<any> {
  try {
    // 특정 필드의 값이 특정 값인 레코드를 조회
    const response = await axios.get(`${baseUrl}/${tableName}/records`, {
      params: {
        filter: `${filterField}~'${encodeURIComponent(filterValue)}'`,
      },
    });

    // 응답 데이터에서 'records' 필드의 유효성 확인
    const records = response.data.records;
    if (records.length === 0) {
      throw new Error(
        `레코드를 찾을 수 없습니다: ${filterField}=${filterValue}`
      );
    }
    return records[0][returnField]; // 첫 번째 레코드에서 원하는 필드의 값을 반환
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

export default getFieldValueByField;

// 사용할 때
// 'party' 테이블에서 'party_name' 필드의 값이 '파티'인 레코드의 'party_notice' 필드를 조회
// async function fetchPartyDescription() {
//   try {
//     const description = await getFieldValueByField('party', 'party_name', '파티', 'party_notice');
//     console.log('파티 공지:', description);
//   } catch (error) {
//     console.error('파티 공지를 조회하는 도중 오류 발생:', error);
//   }
// }

// fetchPartyDescription();
