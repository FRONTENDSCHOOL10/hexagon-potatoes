import pb from '@/utils/pocketbase';
import axios from 'axios';

const baseUrl = `${pb.baseUrl}api/collections/users/auth-with-password`;
const baseTokenUrl = `${pb.baseUrl}api/collections/users/records`;

// 로그인 함수
export const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}`,
      {
        identity: usernameOrEmail,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 유효한 authId인지 검사
export const checkAuthId = async (authId: string) => {
  try {
    const response = await axios.get(`${baseTokenUrl}`, {
      params: {
        filter: ` id="${authId}"`,
      },
    }); // authId로 GET 요청
    if (response.data && response.data.items) {
      return response.data.items; // 유효한 경우 사용자 정보를 반환
    } else {
      return null; // 사용자 정보가 없으면 null 반환
    }
  } catch (error) {
    console.error('인증 오류:', error);
    return null; // 유효하지 않은 경우 null 반환
  }
};
