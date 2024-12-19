import React, { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import { blue, gray, red, white } from '../../../config/theme/themePrimitives';
import { Diversity3Rounded, SupervisorAccountRounded } from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import NotaryDataGrid from './NotaryDataGrid';
import NotarizationService from '../../../services/notarization.service';
import SessionDataGrid from './SessionDataGrid';
import SessionService from '../../../services/session.service';
import StatCard from './StatCard';
import DataGridSection from './DataGridSection';
import AdminService from '../../../services/admin.service';

ChartJS.register(ArcElement, Tooltip, Legend);

const NotaryManagement = () => {
  const [notaryLoading, setNotaryLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [totalNotarizations, setTotalNotarizations] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [notaryPaginationModel, setNotaryPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [sessionPaginationModel, setSessionPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const [notarizations, setNotarizations] = useState([]);
  const [sessions, setSessions] = useState([]);

  const fetchAllNotarizations = useCallback(async () => {
    setNotaryLoading(true);
    try {
      const { page, pageSize } = notaryPaginationModel;
      const result = await NotarizationService.getAllNotarizations(null, pageSize, page);
      setNotarizations(result);
    } finally {
      setNotaryLoading(false);
    }
  }, [notaryPaginationModel]);

  const fetchAllSessions = useCallback(async () => {
    setSessionLoading(true);
    try {
      const { page, pageSize } = sessionPaginationModel;
      const result = await SessionService.getAllSessions(null, pageSize, page);
      setSessions(result);
    } finally {
      setSessionLoading(false);
    }
  }, [sessionPaginationModel]);

  const fetchTotals = async () => {
    try {
      const [notarizationsResult, sessionsResult] = await Promise.all([
        AdminService.getDocumentMetricsByPeriod('current_year'),
        AdminService.getSessionMetricsByPeriod('current_year'),
      ]);
      setTotalNotarizations(notarizationsResult.currentPeriod.documentCount);
      setTotalSessions(sessionsResult.currentPeriod.sessionCount);
    } catch (error) {
      console.error('Error fetching totals:', error);
    }
  };

  useEffect(() => {
    fetchAllNotarizations();
  }, [notaryPaginationModel, fetchAllNotarizations]);

  useEffect(() => {
    fetchAllSessions();
  }, [sessionPaginationModel, fetchAllSessions]);

  useEffect(() => {
    fetchTotals();
  }, [totalNotarizations, totalSessions]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, p: 2, backgroundColor: gray[50] }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            backgroundColor: white[50],
            borderRadius: 3,
            gap: 2,
          }}
        >
          <StatCard
            backgroundColor={blue[50]}
            backgroundIconColor={blue[500]}
            icon={<SupervisorAccountRounded sx={{ fontSize: 32 }} />}
            count={totalNotarizations}
            label="Số lượng công chứng"
          />
          <StatCard
            backgroundColor={red[50]}
            backgroundIconColor={red[500]}
            icon={<Diversity3Rounded sx={{ fontSize: 32 }} />}
            count={totalSessions}
            label="Số lượng phiên công chứng"
          />
        </Box>

        <DataGridSection title="Danh sách công chứng" loading={notaryLoading}>
          <NotaryDataGrid
            data={notarizations}
            paginationModel={notaryPaginationModel}
            setPaginationModel={setNotaryPaginationModel}
            loading={notaryLoading}
          />
        </DataGridSection>

        <DataGridSection title="Danh sách phiên công chứng" loading={sessionLoading}>
          <SessionDataGrid
            data={sessions}
            paginationModel={sessionPaginationModel}
            setPaginationModel={setSessionPaginationModel}
            loading={sessionLoading}
          />
        </DataGridSection>
      </Box>
    </Box>
  );
};

export default NotaryManagement;
