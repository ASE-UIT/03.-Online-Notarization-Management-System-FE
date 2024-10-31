import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Header from './Header';
import RevenueChart from './RevenuePerServiceChart';
import SectorRevenueChart from './RevenuePerFieldChart';
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

const AdminDashboard = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 3,
    page: 0,
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, p: 2, backgroundColor: gray[50] }}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: 'column',
              backgroundColor: white[50],
              p: 2,
              boxShadow: 1,
              borderRadius: 2.5,
              flex: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ color: black[900], fontSize: 16, fontWeight: 600, marginBottom: 1 }}>Thống kê</Typography>
                <Typography sx={{ color: black[400], fontSize: 14, fontWeight: 400 }}>Thống kê hôm nay</Typography>
              </Box>
              <Button
                variant="outlined"
                sx={{
                  height: 'fit-content',
                  backgroundColor: white[50],
                  border: `2px solid ${dark[100]}`,
                  padding: '8px 16px',
                  color: dark[500],
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: primary[500],
                    color: primary[500],
                  },
                  '&:hover .MuiSvgIcon-root': {
                    color: primary[500],
                  },
                }}
                startIcon={<FileUploadRounded sx={{ color: dark[400], fontSize: '16px' }} />}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: 'capitalize',
                    fontWeight: '500',
                    lineHeight: 1,
                  }}
                >
                  Xuất
                </Typography>
              </Button>
            </Box>
            <StatCardSection />
          </Box>
          <DocumentDataGrid paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <RevenuePerServiceChart
            notaryServiceBarChartData={notaryServiceBarChartData}
            notaryServiceBarChartOptions={notaryServiceBarChartOptions}
          />
          <RevenuePerFieldChart
            notaryFieldBarChartData={notaryFieldBarChartData}
            notaryFieldBarChartOptions={notaryFieldBarChartOptions}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}></Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
