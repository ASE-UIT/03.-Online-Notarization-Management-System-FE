import axiosConfig from '../utils/axiosConfig';
import { API_BASE_URL } from './config';
const USER_ENDPOINT = `${API_BASE_URL}/users`;
const USER_EMAIL_ENDPOINT = `${API_BASE_URL}/users/search-user-by-email/`;

const getUserById = async (id) => {
  try {
    const response = await axiosConfig.get(`${USER_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error('Network Error');
    }
  }
};

const searchUserByEmail = async (email) => {
  try {
    const response = await axiosConfig.get(`${USER_ENDPOINT}/search-user-by-email/${email}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error('Network Error');
    }
  }
};
const updateUserById = async (id, updateBody) => {
  try {
    const response = await axiosConfig.patch(`${USER_ENDPOINT}/${id}`, updateBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error('Network Error');
    }
  }
};

const UserService = {
  getUserById,
  searchUserByEmail,
  updateUserById,
};

export default UserService;
