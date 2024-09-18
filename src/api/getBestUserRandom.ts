import axios from 'axios';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import getUserById from '@/api/getUserById'; // 실제 경로로 수정하세요
import getPartyByUserId from './getPartyByUserId';

const baseUserUrl = `${pb.baseUrl}/api/collections/_pb_users_auth_/records`;
const basePartyUrl = `${pb.baseUrl}/api/collections/parties/records`;

// 유저가 리더인 파티 개수 가져오기
const fetchPartyCount = async (userId: string): Promise<number> => {
  try {
    const partyRecords = await getPartyByUserId(userId);
    return partyRecords.length;
  } catch (error) {
    console.error('Failed to fetch party count:', error);
    return 0;
  }
};

// 평점이 5인 유저 목록 가져오기
const fetchTopRatedUsers = async () => {
  try {
    const response = await axios.get(baseUserUrl, {
      params: {
        filter: 'rating=4' || 'rating = 5',
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Failed to fetch top-rated users:', error);
    throw error;
  }
};

// 랜덤으로 하나의 유저 선택
const getBestUserRandom = async () => {
  try {
    const users = await fetchTopRatedUsers();
    if (users.length === 0) {
      throw new Error('No top-rated users found');
    }
    const randomIndex = Math.floor(Math.random() * users.length);
    const selectedUser = users[randomIndex];

    const partyCount = await fetchPartyCount(selectedUser.id);
    const userDetails = await getUserById(selectedUser.id);

    return {
      ...userDetails,
      party_number: partyCount,
    };
  } catch (error) {
    console.error('Error fetching random top-rated user:', error);
    throw error;
  }
};

export default getBestUserRandom;
