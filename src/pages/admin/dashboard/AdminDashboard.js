import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from './Header';
import RevenueChart from './RevenueChart';
import SectorRevenueChart from './SectorRevenueChart';
import StatCardSection from './StatCardSection';
import DocumentDataGrid from './DocumentDataGrid';
import { barChartData, barChartOptions, lineChartData, lineChartOptions } from '../../../config/chartConfig';
import { gray, green, dark, blue } from '../../../config/theme/themePrimitives';
import { FiberSmartRecordRounded } from '@mui/icons-material';

const AdminDashboard = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 3,
    page: 0,
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, p: 2, backgroundColor: gray[50] }}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <StatCardSection />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <RevenueChart lineChartData={lineChartData} lineChartOptions={lineChartOptions} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              flex: 0.5,
              p: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FiberSmartRecordRounded sx={{ fontSize: 20, color: green[500] }} />
              <Box>
                <Typography sx={{ color: dark[900], fontSize: 16, fontWeight: 500 }}>125.900 triệu đồng</Typography>
                <Typography sx={{ color: dark[400], fontSize: 14, fontWeight: 400 }}>Tháng trước</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FiberSmartRecordRounded sx={{ fontSize: 20, color: blue[500] }} />
              <Box>
                <Typography sx={{ color: dark[900], fontSize: 16, fontWeight: 500 }}>232.192 triệu đồng</Typography>
                <Typography sx={{ color: dark[400], fontSize: 14, fontWeight: 400 }}>Tháng hiện tại</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <SectorRevenueChart barChartData={barChartData} barChartOptions={barChartOptions} />

          <DocumentDataGrid paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
