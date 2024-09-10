import axios from 'axios';
import pb from '@/utils/pocketbase';
import getPbImageURL from '@/utils/getPbImageURL'; // getPbImageURL 함수 import
import getUserById from '@/api/getUserById'; // 사용자 정보를 가져오는 유틸리티 함수 import

const baseUrl = `${pb.baseUrl}/api/collections/party/records`; // 파티 컬렉션의 기본 URL
const defaultPartyImage = '/assets/shipmatelogo.png'; // 기본 파티 이미지 URL

/**
 * 주어진 키워드를 기준으로 파티를 검색합니다.
 *
 * @param keyword - 검색할 키워드. 파티 이름 또는 설명에서 이 키워드를 포함하는 파티를 검색합니다.
 *
 * @returns 검색된 파티 목록과 해당 파티의 리더 정보가 포함된 객체.
 * @throws 오류가 발생하면 예외를 발생시킵니다.
 */
async function getPartyByKeyword(keyword: string) {
  try {
    // 파티 이름 또는 설명에 키워드가 포함된 파티를 검색하는 API 호출
    const response = await axios.get(`${baseUrl}`, {
      params: {
        filter: `party_name~'${keyword}' || party_about~'${keyword}'`,
      },
    });

    const parties = response.data.items;

    // 각 파티에 대해 리더 정보를 추가하여 처리
    const partyWithLeaders = await Promise.all(
      parties.map(async (party: any) => {
        // 파티 이미지 URL을 가져오거나 기본 이미지 사용
        const partyImg = party.party_img
          ? getPbImageURL(pb.baseUrl, party, 'party_img')
          : defaultPartyImage;

        // 파티 리더 정보가 있는 경우, 리더 정보를 가져옵니다.
        if (party.party_leader) {
          const leader = await getUserById(party.party_leader);
          return {
            id: party.id, // 파티 ID
            partyImg, // 파티 이미지 URL
            leader_nickname: leader.nickname, // 리더 닉네임
            leader_photo: leader.profile_photo, // 리더 프로필 사진
            ...party,
          };
        } else {
          // 리더 정보가 없는 경우, 기본값으로 설정합니다.
          return {
            id: party.id, // 파티 ID
            partyImg, // 파티 이미지 URL
            leader_nickname: '', // 리더 닉네임 기본값
            leader_photo: '', // 리더 프로필 사진 기본값
            ...party,
          };
        }
      })
    );

    // 파티 목록과 리더 정보를 포함한 객체를 반환
    return {
      ...response.data,
      items: partyWithLeaders,
    };
  } catch (error) {
    console.error('파티를 조회하는 도중 오류가 발생했습니다:', error);
    throw error; // 오류 발생 시 예외를 발생시킵니다.
  }
}

export default getPartyByKeyword;
