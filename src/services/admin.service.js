import { API_BASE_URL } from './config';
import axiosConfig from '../utils/axiosConfig';

const ADMIN_METRICS_ENDPOINT = `${API_BASE_URL}/admin/metrics`;

const getDocumentMetricsByPeriod = async (period) => {
  const response = await axiosConfig.get(`${ADMIN_METRICS_ENDPOINT}/documents/${period}`);
  return response.data;
};

const getSessionMetricsByPeriod = async (period) => {
  const response = await axiosConfig.get(`${ADMIN_METRICS_ENDPOINT}/sessions/${period}`);
  return response.data;
};

const getPaymentMetricsByPeriod = async (period) => {
  const response = await axiosConfig.get(`${ADMIN_METRICS_ENDPOINT}/payments/${period}`);
  return response.data;
};

const getPaymentServiceByPeriod = async (period) => {
  const response = await axiosConfig.get(`${ADMIN_METRICS_ENDPOINT}/payments/${period}/service`);
  return response.data;
};

const getPaymentFieldByPeriod = async (period) => {
  const response = await axiosConfig.get(`${ADMIN_METRICS_ENDPOINT}/payments/${period}/field`);
  return response.data;
};

const getDocumentFieldByPeriod = async (period) => {
  const response = await axiosConfig.get(`${ADMIN_METRICS_ENDPOINT}/documents/fields/${period}`);
  return response.data;
};

const AdminService = {
  getDocumentMetricsByPeriod,
  getSessionMetricsByPeriod,
  getPaymentMetricsByPeriod,
  getPaymentServiceByPeriod,
  getPaymentFieldByPeriod,
  getDocumentFieldByPeriod,
};

export default AdminService;
