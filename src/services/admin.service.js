import { API_BASE_URL } from './config';
import axiosConfig from '../utils/axiosConfig';

const ADMIN_METRICS_ENDPOINT = `${API_BASE_URL}/admin/metrics`;

const getEmployeesMetrics = async () => {
    const response = await axiosConfig.get(`${ADMIN_METRICS_ENDPOINT}/employees/list`);
    return response.data;
}

const AdminService = {
    getEmployeesMetrics,
  };
  
  export default AdminService;