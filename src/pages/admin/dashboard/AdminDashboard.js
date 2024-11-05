import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import DocumentDataGrid from './DocumentDataGrid';
import { notaryFieldBarChartOptions, notaryServiceBarChartOptions } from '../../../config/chartConfig';
import { gray, blue, green } from '../../../config/theme/themePrimitives';
import RevenuePerServiceChart from './RevenuePerServiceChart';
import RevenuePerFieldChart from './RevenuePerFieldChart';
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
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const fetchMetrics = useCallback(
    async (selectedPeriod) => {
      const [documentMetrics, sessionMetrics, paymentMetrics] = await Promise.all([
        AdminService.getDocumentMetricsByPeriod(selectedPeriod.id),
        AdminService.getSessionMetricsByPeriod(selectedPeriod.id),
        AdminService.getPaymentMetricsByPeriod(selectedPeriod.id),
      ]);

      setDocumentMetrics(documentMetrics);
      setSessionMetrics(sessionMetrics);
      setPaymentMetrics(paymentMetrics);
    },
    [period],
  );

  const fetchPaymentService = useCallback(
    async (selectedPeriod) => {
      const paymentService = await AdminService.getPaymentServiceByPeriod(selectedPeriod.id);
      setPaymentService(paymentService);
      console.log(paymentService);
    },
    [paymentServicePeriod],
  );

  const fetchPaymentField = useCallback(
    async (selectedPeriod) => {
      const paymentField = await AdminService.getPaymentFieldByPeriod(selectedPeriod.id);
      setPaymentField(paymentField);
      console.log(paymentField);
    },
    [paymentFieldPeriod],
  );

  const fetchDocumentField = useCallback(
    async (selectedPeriod) => {
      const documentField = await AdminService.getDocumentFieldByPeriod(selectedPeriod.id);
      setDocumentField(documentField);
      console.log(documentField);
    },
    [documentFieldPeriod],
  );

  const renderCurrentPeriod = (data) => {
    if (data?.currentPeriod?.period === 'today') {
      return 'Hôm nay';
    } else if (data?.currentPeriod?.period === 'current_week') {
      return 'Tuần này';
    } else if (data?.currentPeriod?.period === 'current_month') {
      return 'Tháng này';
    } else if (data?.currentPeriod?.period === 'current_year') {
      return 'Năm nay';
    }
  };

  const renderPreviousPeriod = (data) => {
    if (data?.previousPeriod?.period === 'previous_today') {
      return 'Hôm qua';
    } else if (data?.previousPeriod?.period === 'previous_current_week') {
      return 'Tuần trước';
    } else if (data?.previousPeriod?.period === 'previous_current_month') {
      return 'Tháng trước';
    } else if (data?.previousPeriod?.period === 'previous_current_year') {
      return 'Năm trước';
    }
  };

  const notaryServiceBarChartData = {
    labels: paymentService.currentPeriod?.totals?.map((item) => item.serviceName) || [],
    datasets: [
      {
        label: renderPreviousPeriod(paymentService),
        data: paymentService.previousPeriod?.totals?.map((item) => item.totalAmount) || [],
        backgroundColor: 'rgba(0, 149, 255, 0.5)',
        borderColor: blue[400],
        borderWidth: 1,
      },
      {
        label: renderCurrentPeriod(paymentService),
        data: paymentService.currentPeriod?.totals?.map((item) => item.totalAmount) || [],
        backgroundColor: 'rgba(67, 183, 93, 0.5)',
        borderColor: green[400],
        borderWidth: 1,
      },
    ],
  };

  const notaryFieldBarChartData = {
    labels: paymentField.currentPeriod?.totals?.map((item) => item.fieldName) || [],
    datasets: [
      {
        label: renderPreviousPeriod(paymentField),
        data: paymentField.previousPeriod?.totals?.map((item) => item.totalAmount) || [],
        backgroundColor: 'rgba(0, 149, 255, 0.5)',
        borderColor: blue[400],
        borderWidth: 1,
      },
      {
        label: renderCurrentPeriod(paymentField),
        data: paymentField.currentPeriod?.totals?.map((item) => item.totalAmount) || [],
        backgroundColor: 'rgba(67, 183, 93, 0.5)',
        borderColor: green[400],
        borderWidth: 1,
      },
    ],
  };

  const formattedDocumentFieldData = documentField.currentPeriod?.totals?.map((item, index) => ({
    id: index + 1,
    category: item.notarizationFieldName,
    ratio: item.amount,
    data: `${item.amount}`,
  }));

  useEffect(() => {
    fetchMetrics(period);
  }, [period]);

  useEffect(() => {
    fetchPaymentService(paymentServicePeriod);
  }, [paymentServicePeriod]);

  useEffect(() => {
    fetchPaymentField(paymentFieldPeriod);
  }, [paymentFieldPeriod]);

  useEffect(() => {
    fetchDocumentField(documentFieldPeriod);
  }, [documentFieldPeriod]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, p: 2, backgroundColor: gray[50] }}>
        <StatisticSection
          period={period}
          setPeriod={setPeriod}
          documentMetrics={documentMetrics}
          sessionMetrics={sessionMetrics}
          paymentMetrics={paymentMetrics}
        />
        <DocumentDataGrid
          period={documentFieldPeriod}
          setPeriod={setDocumentFieldPeriod}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          documentFieldData={formattedDocumentFieldData}
        />

        <RevenuePerServiceChart
          period={paymentServicePeriod}
          setPeriod={setPaymentServicePeriod}
          notaryServiceBarChartData={notaryServiceBarChartData}
          notaryServiceBarChartOptions={notaryServiceBarChartOptions}
        />
        <RevenuePerFieldChart
          period={paymentFieldPeriod}
          setPeriod={setPaymentFieldPeriod}
          notaryFieldBarChartData={notaryFieldBarChartData}
          notaryFieldBarChartOptions={notaryFieldBarChartOptions}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
