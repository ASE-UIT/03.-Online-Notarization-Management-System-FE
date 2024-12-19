import { Box, Typography, Avatar } from '@mui/material';
import { Diversity3Rounded, SupervisorAccountRounded } from '@mui/icons-material';
import React from 'react';
import { black, gray, blue, white } from '../../../config/theme/themePrimitives';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
// } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

// const userLineChartData = {
//   labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
//   datasets: [
//     {
//       label: 'Người dùng mới',
//       data: [40, 30, 20, 35],
//       borderColor: '#e57373',
//       backgroundColor: 'rgba(229, 115, 115, 0.2)',
//       fill: true,
//       tension: 0.4,
//     },
//     {
//       label: 'Người dùng lâu năm',
//       data: [50, 40, 55, 60],
//       borderColor: '#64b5f6',
//       backgroundColor: 'rgba(100, 181, 246, 0.2)',
//       fill: true,
//       tension: 0.4,
//     },
//     {
//       label: 'Người dùng tiềm năng',
//       data: [20, 25, 15, 30],
//       borderColor: '#81c784',
//       backgroundColor: 'rgba(129, 199, 132, 0.2)',
//       fill: true,
//       tension: 0.4,
//     },
//   ],
// };

// const userLineChartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: 'right',
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         callback: (value) => `${value}`,
//       },
//     },
//   },
// };

const UserOverview = ({ userCount })  => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        backgroundColor: white[50],
        borderRadius: '20px',
        gap: 5,
        m: 2,
        boxShadow: 1,
      }}
    >
      {/* Stat Overview */}
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
          boxSizing: 'border-box',
        }}
      >
        <Avatar sx={{ width: 48, height: 48, backgroundColor: blue[500] }}>
          <SupervisorAccountRounded sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography sx={{ fontSize: 32, fontWeight: 600 }}>{userCount}</Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Số lượng người dùng</Typography>
      </Box>

      {/* Chart Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
                  px: 6,
            py:2,
          gap: 1,
          width: '200px',
          boxSizing: 'border-box',
          flex: 1,
        }}
      >
        {/* <Line data={userLineChartData} options={userLineChartOptions} /> */}
      </Box>
    </Box>
  );
};

export default UserOverview;
