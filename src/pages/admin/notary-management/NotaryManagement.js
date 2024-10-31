import React, { useState } from 'react';
import Header from './Header';
import { Avatar, Box, Typography } from '@mui/material';
import { blue, gray, red, white } from '../../../config/theme/themePrimitives';
import { Diversity3Rounded, SupervisorAccountRounded } from '@mui/icons-material';
import { Pie } from 'react-chartjs-2';
import { notaryPieChartData, notaryPieChartOptions } from '../../../config/chartConfig';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary components
import NotaryDataGrid from './NotaryDataGrid';

ChartJS.register(ArcElement, Tooltip, Legend);

const NotaryManagement = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 6,
    page: 0,
  });

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
              flex: 1,
              width: { xs: '100%', md: 'auto' },
              boxSizing: 'border-box',
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
              flex: 1,
              width: { xs: '100%', md: 'auto' },
              boxSizing: 'border-box',
            }}
          >
            <Avatar sx={{ width: 48, height: 48, backgroundColor: red[500] }}>
              <Diversity3Rounded sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography sx={{ fontSize: 32, fontWeight: 600 }}>54</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Số lượng phiên công chứng</Typography>
          </Box>
          <Box sx={{ flex: 1, p: 2 }}>
            <Pie data={notaryPieChartData} options={notaryPieChartOptions} />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 500,
            backgroundColor: white[50],
            borderRadius: 2,
            p: 2,
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Danh sách công chứng</Typography>
          <NotaryDataGrid paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 500,
            backgroundColor: white[50],
            borderRadius: 2,
            p: 2,
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
            Danh sách phiên công chứng
          </Typography>
          <NotaryDataGrid paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
        </Box>
      </Box>
    </Box>
  );
};

export default NotaryManagement;
