import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import DocumentByField from './DocumentByField';
import { notaryFieldBarChartOptions, notaryServiceBarChartOptions } from '../../../config/chartConfig';
import { gray, blue, green } from '../../../config/theme/themePrimitives';
import RevenueByServiceSection from './RevenueByServiceSection';
import RevenueByFieldSection from './RevenueByFieldSection';
import AdminService from '../../../services/admin.service';
import StatisticSection from './StatisticSection';

const AdminDashboard = () => {
  const [period, setPeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [paymentServicePeriod, setPaymentServicePeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [paymentFieldPeriod, setPaymentFieldPeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [documentFieldPeriod, setDocumentFieldPeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [documentMetrics, setDocumentMetrics] = useState({});
  const [sessionMetrics, setSessionMetrics] = useState({});
  const [paymentMetrics, setPaymentMetrics] = useState({});
  const [paymentService, setPaymentService] = useState({});
  const [paymentField, setPaymentField] = useState({});
  const [documentField, setDocumentField] = useState({});
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

  const fetchMetrics = useCallback(async (selectedPeriod) => {
    const [docMetrics, sessMetrics, payMetrics] = await Promise.all([
      AdminService.getDocumentMetricsByPeriod(selectedPeriod.id),
      AdminService.getSessionMetricsByPeriod(selectedPeriod.id),
      AdminService.getPaymentMetricsByPeriod(selectedPeriod.id),
    ]);

    setDocumentMetrics(docMetrics);
    setSessionMetrics(sessMetrics);
    setPaymentMetrics(payMetrics);
  }, []);

  const fetchData = useCallback(async (serviceMethod, setState, selectedPeriod) => {
    const data = await serviceMethod(selectedPeriod.id);
    setState(data);
  }, []);

  const getChartLabel = (data, periodType) => {
    switch (data?.[periodType]?.period) {
      case 'today':
        return 'Hôm nay';
      case 'current_week':
        return 'Tuần này';
      case 'current_month':
        return 'Tháng này';
      case 'current_year':
        return 'Năm nay';
      case 'previous_today':
        return 'Hôm qua';
      case 'previous_current_week':
        return 'Tuần trước';
      case 'previous_current_month':
        return 'Tháng trước';
      case 'previous_current_year':
        return 'Năm trước';
      default:
        return '';
    }
  };

  const buildChartData = (data, labelAccessor) => ({
    labels: data.currentPeriod?.totals?.map(labelAccessor) || [],
    datasets: [
      {
        label: getChartLabel(data, 'previousPeriod'),
        data: data.previousPeriod?.totals?.map((item) => item.totalAmount) || [],
        backgroundColor: 'rgba(0, 149, 255, 0.5)',
        borderColor: blue[400],
        borderWidth: 1,
      },
      {
        label: getChartLabel(data, 'currentPeriod'),
        data: data.currentPeriod?.totals?.map((item) => item.totalAmount) || [],
        backgroundColor: 'rgba(67, 183, 93, 0.5)',
        borderColor: green[400],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchMetrics(period);
  }, [period, fetchMetrics]);

  useEffect(() => {
    fetchData(AdminService.getPaymentServiceByPeriod, setPaymentService, paymentServicePeriod);
  }, [paymentServicePeriod, fetchData]);

  useEffect(() => {
    fetchData(AdminService.getPaymentFieldByPeriod, setPaymentField, paymentFieldPeriod);
  }, [paymentFieldPeriod, fetchData]);

  useEffect(() => {
    fetchData(AdminService.getDocumentFieldByPeriod, setDocumentField, documentFieldPeriod);
  }, [documentFieldPeriod, fetchData]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, p: 2, backgroundColor: gray[50], display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StatisticSection
          period={period}
          setPeriod={setPeriod}
          documentMetrics={documentMetrics}
          sessionMetrics={sessionMetrics}
          paymentMetrics={paymentMetrics}
        />
        <DocumentByField
          period={documentFieldPeriod}
          setPeriod={setDocumentFieldPeriod}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          documentFieldData={documentField.currentPeriod?.totals?.map((item, index) => ({
            id: index + 1,
            category: item.notarizationFieldName,
            ratio: item.amount,
            data: `${item.amount}`,
          }))}
        />
        <RevenueByServiceSection
          period={paymentServicePeriod}
          setPeriod={setPaymentServicePeriod}
          notaryServiceBarChartData={buildChartData(paymentService, (item) => item.serviceName)}
          notaryServiceBarChartOptions={notaryServiceBarChartOptions}
        />
        <RevenueByFieldSection
          period={paymentFieldPeriod}
          setPeriod={setPaymentFieldPeriod}
          notaryFieldBarChartData={buildChartData(paymentField, (item) => item.fieldName)}
          notaryFieldBarChartOptions={notaryFieldBarChartOptions}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
