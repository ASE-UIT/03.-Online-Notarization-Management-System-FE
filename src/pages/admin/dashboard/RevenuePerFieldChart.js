import React from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { black, white } from '../../../config/theme/themePrimitives';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
ChartJS.register(BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const RevenuePerFieldChart = ({ notaryFieldBarChartData, notaryFieldBarChartOptions }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: white[50],
        p: 2,
        boxShadow: 1,
        borderRadius: 2.5,
        flex: 1,
        minHeight: '400px',
      }}
    >
      <Typography sx={{ color: black[900], fontSize: 16, fontWeight: 600 }}>Doanh thu từng lĩnh vực</Typography>
      <Box sx={{ height: '100%', flex: 1 }}>
        <Bar data={notaryFieldBarChartData} options={notaryFieldBarChartOptions} />
      </Box>
    </Box>
  );
};

export default RevenuePerFieldChart;
