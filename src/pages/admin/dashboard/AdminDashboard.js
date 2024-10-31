import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Grid2,
} from '@mui/material';
import Header from './Header';
import StatCardSection from './StatCardSection';
import DocumentDataGrid from './DocumentDataGrid';
import {
  notaryFieldBarChartData,
  notaryFieldBarChartOptions,
  notaryServiceBarChartData,
  notaryServiceBarChartOptions,
} from '../../../config/chartConfig';
import { gray, dark, black, white, primary } from '../../../config/theme/themePrimitives';
import { FileUploadRounded } from '@mui/icons-material';
import RevenuePerServiceChart from './RevenuePerServiceChart';
import RevenuePerFieldChart from './RevenuePerFieldChart';
import AdminService from '../../../services/admin.service';
import StatisticSection from './StatisticSection';

const AdminDashboard = () => {
  const [period, setPeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [documentMetrics, setDocumentMetrics] = useState({});
  const [sessionMetrics, setSessionMetrics] = useState({});
  const [paymentMetrics, setPaymentMetrics] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 3,
    page: 0,
  });

  const fetchMetrics = async (selectedPeriod) => {
    const [documentMetrics, sessionMetrics, paymentMetrics] = await Promise.all([
      AdminService.getDocumentMetricsByPeriod(selectedPeriod.id),
      AdminService.getSessionMetricsByPeriod(selectedPeriod.id),
      AdminService.getPaymentMetricsByPeriod(selectedPeriod.id),
    ]);

    setDocumentMetrics(documentMetrics);
    setSessionMetrics(sessionMetrics);
    setPaymentMetrics(paymentMetrics);
  };

  useEffect(() => {
    fetchMetrics(period);
  }, [period]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, p: 2, backgroundColor: gray[50] }}>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', md: 'row' } }}>
          <StatisticSection
            period={period}
            setPeriod={setPeriod}
            documentMetrics={documentMetrics}
            sessionMetrics={sessionMetrics}
            paymentMetrics={paymentMetrics}
          />
          <DocumentDataGrid paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', md: 'row' } }}>
          <RevenuePerServiceChart
            notaryServiceBarChartData={notaryServiceBarChartData}
            notaryServiceBarChartOptions={notaryServiceBarChartOptions}
          />
          <RevenuePerFieldChart
            notaryFieldBarChartData={notaryFieldBarChartData}
            notaryFieldBarChartOptions={notaryFieldBarChartOptions}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
