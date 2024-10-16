import axios from 'axios';
import { API_BASE_URL } from './config';
import axiosConfig from './axiosConfig';

const NOTARIZATION_ENDPOINT = `${API_BASE_URL}/notarization`;
const NOTARIZATION_FIELD_ENDPOINT = `${API_BASE_URL}/notarization-fields`;
const NOTARIZATION_SERVICE_ENDPOINT = `${API_BASE_URL}/notarization-services`;

const getStatusById = async (documentId) => {
  try {
    const response = await axios.get(`${NOTARIZATION_ENDPOINT}/getStatusById/${documentId}`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    throw { status, message };
  }
};

const getAllNotarizationField = async () => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_FIELD_ENDPOINT}/get-all-notarization-fields`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    throw { status, message };
  }
};

const getNotarizationServiceByFieldId = async (fieldId) => {
  try {
    const response = await axiosConfig.get(
      `${NOTARIZATION_SERVICE_ENDPOINT}/get-notarization-services-by-field-id/${fieldId}`,
    );
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    throw { status, message };
  }
};

const getAllNotarizationService = async () => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_SERVICE_ENDPOINT}/get-all-notarization-services`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    throw { status, message };
  }
};

const getHistory = async () => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_ENDPOINT}/history`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    throw { status, message };
  }
};

const uploadNotarizationDocument = async (document) => {
  try {
    console.log('document', document);
    const response = await axiosConfig.post(`${NOTARIZATION_ENDPOINT}/upload-files`, document);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    throw { status, message };
  }
};

const NotarizationService = {
  getStatusById,
  getAllNotarizationField,
  getAllNotarizationService,
  getHistory,
  getNotarizationServiceByFieldId,
  uploadNotarizationDocument,
};

export default NotarizationService;
