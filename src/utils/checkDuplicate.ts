import axios from 'axios';
import pb from '@/utils/pocketbase';
const baseUrl = `${pb.baseUrl}/api/collections/users/records`;

export async function checkDuplicate(
  fieldName: string,
  value: string
): Promise<boolean> {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        filter: `${fieldName}='${value}'`, // 필드와 값으로 필터링
      },
    });

    const records = response.data.items;
    console.log(records);

    // 레코드가 없으면 중복이 아님
    return !(records && records.length > 0); // 중복이면 false, 중복 아니면 true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 오류 발생:', error.message);
    } else {
      console.warn('예상치 못한 오류 발생:', error);
    }
    throw error;
  }
}

export default checkDuplicate;
