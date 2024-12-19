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
const getAllUsers = async (role = 'user', sortBy = null, limit, page) => {
  try {
    const response = await axiosConfig.get(`${USER_ENDPOINT}`, {
      params: {
        role,
        sortBy,
        limit,
        page,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
}

const createUserAccount = async (user) => {
  try {
    const response = await axiosConfig.post(`${USER_ENDPOINT}`, user);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
}

const UserService = {
  getUserById,
  searchUserByEmail,
  updateUserById,
  getAllUsers,
  createUserAccount,
};

export default UserService;
