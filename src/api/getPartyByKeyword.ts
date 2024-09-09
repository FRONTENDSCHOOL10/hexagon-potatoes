import axios from 'axios';
import pb from '@/utils/pocketbase';

const baseUrl = `${pb.baseUrl}/api/collections/party/records`;

// `partyName` 또는 `party_about` 필드에서 특정 키워드를 검색하여 파티를 조회하는 함수
async function getPartyByKeyword(keyword: string) {
  try {
    // `partyName` 또는 `party_about` 필드에서 키워드를 포함한 레코드를 조회
    const response = await axios.get(`${baseUrl}`, {
      params: {
        filter: `party_name~'${keyword}' || party_about~'${keyword}'`,
      },
    });

    return response.data; // 조회된 데이터 반환
  } catch (error) {
    console.error('파티를 조회하는 도중 오류가 발생했습니다:', error);
    throw error;
  }
}

export default getPartyByKeyword;

// 사용할 때
// getPartyByKeyword('파티')
//     .then((partyList) => {
//       console.log('조회된 파티 목록:', partyList.items);
//     })
//     .catch((error) => {
//       console.error('파티를 조회하는 도중 오류가 발생했습니다:', error);
//     });
