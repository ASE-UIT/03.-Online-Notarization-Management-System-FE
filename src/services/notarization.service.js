import axios from 'axios';
import { API_BASE_URL } from './config';
import axiosConfig from '../utils/axiosConfig';

const NOTARIZATION_ENDPOINT = `${API_BASE_URL}/notarization`;
const NOTARIZATION_FIELD_ENDPOINT = `${API_BASE_URL}/notarization-fields`;
const NOTARIZATION_SERVICE_ENDPOINT = `${API_BASE_URL}/notarization-services`;

const getStatusById = async (documentId) => {
  try {
    const response = await axios.get(`${NOTARIZATION_ENDPOINT}/getStatusById/${documentId}`);
    return response;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const getAllNotarizationField = async () => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_FIELD_ENDPOINT}/get-all-notarization-fields`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
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
    return { status, message };
  }
};

const getAllNotarizationService = async () => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_SERVICE_ENDPOINT}/get-all-notarization-services`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const getHistory = async () => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_ENDPOINT}/get-history-with-status`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const uploadNotarizationDocument = async (document) => {
  try {
    const response = await axiosConfig.post(`${NOTARIZATION_ENDPOINT}/upload-files`, document);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const getAllNotarizations = async (sortBy = null, limit, page) => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_ENDPOINT}/getAllNotarization`, {
      params: {
        sortBy,
        limit,
        page: page + 1,
      },
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const getNotarizationByRole = async ({ status, page, limit }) => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_ENDPOINT}/getDocumentByRole`, {
      params: { status, page, limit },
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const getApproveHistory = async () => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_ENDPOINT}/getApproveHistory`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const getDocumentById = async (documentId) => {
  try {
    const response = await axiosConfig.get(`${NOTARIZATION_ENDPOINT}/document/${documentId}`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const forwardDocumentStatus = async (documentId, formData) => {
  try {
    const response = await axiosConfig.patch(`${NOTARIZATION_ENDPOINT}/forwardDocumentStatus/${documentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const approveSignatureByUser = async (formData) => {
  try {
    const response = await axiosConfig.post(`${NOTARIZATION_ENDPOINT}/approve-signature-by-user`, formData);
    return response;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const approveSignatureByNotary = async (documentId) => {
  try {
    const response = await axiosConfig.post(`${NOTARIZATION_ENDPOINT}/approve-signature-by-notary`, { documentId });
    return response;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const NotarizationService = {
  getStatusById,
  getAllNotarizationField,
  getAllNotarizationService,
  getHistory,
  getNotarizationServiceByFieldId,
  uploadNotarizationDocument,
  getAllNotarizations,
  getNotarizationByRole,
  getApproveHistory,
  getDocumentById,
  forwardDocumentStatus,
  approveSignatureByUser,
  approveSignatureByNotary,
};

export default NotarizationService;
