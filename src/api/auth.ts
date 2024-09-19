import pb from '@/utils/pocketbase';
import axios from 'axios';
const baseUrl = `${pb.baseUrl}api/collections/users/auth-with-password`;

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
