import axios from 'axios';
import pb from '@/utils/pocketbase';
import getPbImageURL from '@/utils/getPbImageURL';
import getUserById from '@/api/getUserById';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import getUserIdByNickName from './getUserIdByNickName';

const baseUrl = `${pb.baseUrl}/api/collections/party/records`;
const usersBaseUrl = `${pb.baseUrl}/api/collections/users/records`;
const countryImg = (country: string) => {
  switch (country) {
    case '미국':
      return '/assets/country/american-flag.webp';
    case '중국':
      return '/assets/country/china-flag.webp';
    case '일본':
      return '/assets/country/japan-flag.webp';
    default:
      return '/assets/shipmatelogo.png';
  }
};
// 파티 이름, 파티 소개, 파티장의 닉네임, 국가 중 하나라도 키워드가 포함된 파티 반환
async function getPartyByKeyword(keyword: string) {
  try {
    // 1. 파티 이름이나 소개로 검색
    let response = await axios.get(baseUrl, {
      params: {
        filter: `party_name~'${keyword}' || party_about~'${keyword}'`,
      },
    });

    let parties = response.data.items;

    // 2. 파티장 닉네임으로 검색
    const userId = await getUserIdByNickName(keyword);
    if (!(userId == 'no user')) {
      const leaderResponse = await axios.get(baseUrl, {
        params: {
          filter: `party_leader='${userId}'`,
        },
      });
      // 기존 검색 결과와 병합
      parties = parties.concat(leaderResponse.data.items);
    }

    // 3. 국가로 검색
    const country = await axios.get(baseUrl, {
      params: {
        filter: `country = '${keyword}'`,
      },
    });
    parties = parties.concat(country.data.items);

    if (parties.length > 0) {
      const partyWithLeaders = await Promise.all(
        parties.map(async (party: any) => {
          // const partyImg = party.party_img
          //   ? getPbImageURL(pb.baseUrl, party, 'party_img')
          //   : '';

          const partyImg = countryImg(party.country);

          const leader = party.party_leader
            ? await getUserById(party.party_leader)
            : { nickname: '', profile_photo: DefaultProfileSVG };

          return {
            id: party.id,
            partyImg,
            leader_nickname: leader.nickname,
            leader_photo: leader.profile_photo,
            ...party,
          };
        })
      );

      return {
        items: partyWithLeaders,
      };
    }

    // 3. 파티가 없으면 null을 반환합니다.
    return { ...response.data };
  } catch (error) {
    console.error('파티를 조회하는 도중 오류가 발생했습니다:', error);
    throw error;
  }
}

export default getPartyByKeyword;
