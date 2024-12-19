import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { blue, dark } from '../../../config/theme/themePrimitives';

const StatCard = ({ title, value, percentageChange, color, icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        p: 2,
        backgroundColor: color[50],
        borderRadius: 2,
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <Avatar sx={{ width: 32, height: 32, backgroundColor: color[500] }}>{icon}</Avatar>
      <Typography sx={{ fontSize: 20, fontWeight: 600, color: dark[900] }}>{value}</Typography>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: dark[900],
          flex: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          maxWidth: '99%',
          fontWeight: 500,
          color: blue[500],
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {percentageChange}
      </Typography>
    </Box>
  );
};

export default StatCard;
