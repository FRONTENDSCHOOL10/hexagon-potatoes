import pb from '@/utils/pocketbase';
import axios from 'axios';

const baseUrl = `${pb.baseUrl}api/collections/users/records`;
const createUser = async (userData: {
  name: string;
  username: string;
  user_email: string;
  email: string;
  nickname: string;
  phone_number: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    const response = await axios.post(`${baseUrl}`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('회원가입 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;
  }
};

export default createUser;
