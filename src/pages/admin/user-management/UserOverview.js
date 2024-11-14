import { Box, Typography, Avatar } from '@mui/material';
import { SupervisorAccountRounded } from '@mui/icons-material';
import React from 'react';
import { blue, white } from '../../../config/theme/themePrimitives';

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
