import axiosConfig from '../utils/axiosConfig';
import { API_BASE_URL } from './config';

const SESSION_ENDPOINT = `${API_BASE_URL}/session`;

const createSession = async (session) => {
  try {
    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/createSession`, session);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const getSessionsByUserId = async () => {
  try {
    const response = await axiosConfig.get(`${SESSION_ENDPOINT}/getSessionsByUserId`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const deleteUserOutOfSession = async (sessionId, email) => {
  try {
    const response = await axiosConfig.patch(`${SESSION_ENDPOINT}/deleteUser/${sessionId}`, { email });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const SessionService = {
  createSession,
  getSessionsByUserId,
  deleteUserOutOfSession,
};

export default SessionService;
