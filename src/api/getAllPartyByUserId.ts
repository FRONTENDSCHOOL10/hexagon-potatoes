import axios from 'axios';
import pb from '@/utils/pocketbase';
import getPbImageURL from '@/utils/getPbImageURL';
import getUserById from '@/api/getUserById';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import getUserIdByNickName from './getUserIdByNickName';

const baseUrl = `${pb.baseUrl}api/collections/party/records`;
const memberBaseUrl = `${pb.baseUrl}api/collections/party_member/records`;

const countryImg = (country: string) => {
  switch (country) {
    case '미국':
      return '/assets/country/american-flag.webp';
    case '중국':
      return '/assets/country/china-flag.webp';
    case '일본':
      return '/assets/country/japan-flag.webp';
    default:
      return '/assets/shipmatelogo.webp';
  }
};

async function getAllPartyByUserId(keyword: string) {
  try {
    let parties: any[] = [];

    const userId = await getUserIdByNickName(keyword);
    if (userId !== 'no user') {
      const leaderResponse = await axios.get(baseUrl, {
        params: {
          filter: `party_leader='${userId}'`,
        },
      });
      parties = leaderResponse.data.items;

      const memberResponse = await axios.get(memberBaseUrl, {
        params: {
          filter: `member_id='${userId}'`,
        },
      });

      const memberPartyPromises = memberResponse.data.items.map(
        async (party: { party_id: string }) => {
          const partyResponse = await axios.get(baseUrl, {
            params: {
              filter: `id='${party.party_id}'`,
            },
          });
          return partyResponse.data.items[0];
        }
      );

      const memberParties = await Promise.all(memberPartyPromises);
      parties = [...parties, ...memberParties];
    }

    if (parties.length > 0) {
      const partyWithLeaders = await Promise.all(
        parties.map(async (party: any) => {
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

    return { items: [] };
  } catch (error) {
    console.error('파티를 조회하는 도중 오류가 발생했습니다:', error);
    throw error;
  }
}

export default getAllPartyByUserId;
