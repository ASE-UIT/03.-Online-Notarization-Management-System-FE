import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Avatar, Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { blue, gray, red, white } from '../../../config/theme/themePrimitives';
import { Diversity3Rounded, SupervisorAccountRounded } from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import NotaryDataGrid from './NotaryDataGrid';
import NotarizationService from '../../../services/notarization.service';
import SessionDataGrid from './SessionDataGrid';
import SessionService from '../../../services/session.service';

ChartJS.register(ArcElement, Tooltip, Legend);

const NotaryManagement = () => {
  const [loading, setLoading] = useState(false);
  const [notaryPaginationModel, setNotaryPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [sessionPaginationModel, setSessionPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [notarizations, setNotarizations] = useState([]);
  const [sessions, setSessions] = useState([]);

  const fetchAllNotarizations = async () => {
    setLoading(true);
    try {
      const { page, pageSize } = notaryPaginationModel;
      const result = await NotarizationService.getAllNotarizations('', pageSize, page);
      setNotarizations(result);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSessions = async () => {
    setLoading(true);
    try {
      const { page, pageSize } = sessionPaginationModel;
      const result = await SessionService.getAllSessions('', pageSize, page);
      setSessions(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotarizations();
  }, [notaryPaginationModel]);

  useEffect(() => {
    fetchAllSessions();
  }, [sessionPaginationModel]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, p: 2, backgroundColor: gray[50] }}>
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              p: 2,
              backgroundColor: blue[50],
              borderRadius: 2,
              gap: 1,
              width: { xs: '100%', md: 'auto' },
              boxSizing: 'border-box',
              flex: 1,
            }}
          >
            <Avatar sx={{ width: 48, height: 48, backgroundColor: blue[500] }}>
              <SupervisorAccountRounded sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography sx={{ fontSize: 32, fontWeight: 600 }}>54</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Số lượng công chứng</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              p: 2,
              backgroundColor: red[50],
              borderRadius: 2,
              gap: 1,
              width: { xs: '100%', md: 'auto' },
              boxSizing: 'border-box',
              flex: 1,
            }}
          >
            <Avatar sx={{ width: 48, height: 48, backgroundColor: red[500] }}>
              <Diversity3Rounded sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography sx={{ fontSize: 32, fontWeight: 600 }}>54</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Số lượng phiên công chứng</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: white[50],
            borderRadius: 2,
            p: 2,
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Danh sách công chứng</Typography>
          <NotaryDataGrid
            data={notarizations}
            paginationModel={notaryPaginationModel}
            setPaginationModel={setNotaryPaginationModel}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: white[50],
            borderRadius: 2,
            p: 2,
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
            Danh sách phiên công chứng
          </Typography>
          <SessionDataGrid
            data={sessions}
            paginationModel={sessionPaginationModel}
            setPaginationModel={setSessionPaginationModel}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NotaryManagement;
