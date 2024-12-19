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

const getAllSessions = async (sortBy = null, limit, page) => {
  try {
    const response = await axiosConfig.get(`${SESSION_ENDPOINT}/getAllSessions`, {
      params: {
        sortBy,
        limit,
        page: page + 1,
      },
    });
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

const addUser = async (sessionId, emails) => {
  try {
    const response = await axiosConfig.patch(`${SESSION_ENDPOINT}/addUser/${sessionId}`, { emails });
    return response;
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

const uploadSessionDocument = async (sessionId, files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/upload-session-document/${sessionId}`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const joinSession = async (sessionId, action) => {
  try {
    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/joinSession/${sessionId}`, { action });
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const deleteSessionFile = async (sessionId, fileId) => {
  try {
    const response = await axiosConfig.delete(`${SESSION_ENDPOINT}/delete-session-document/${sessionId}/${fileId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const SessionService = {
  createSession,
  getAllSessions,
  getSessionsByUserId,
  deleteUserOutOfSession,
  addUser,
  getSessionsByUserId,
  uploadSessionDocument,
  joinSession,
  deleteSessionFile,
};

export default SessionService;
