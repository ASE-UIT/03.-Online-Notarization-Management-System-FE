import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

const StatCard = ({ backgroundColor, icon, backgroundIconColor, count, label }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      p: 2,
      backgroundColor,
      borderRadius: 2,
      gap: 1,
      flex: 1,
      width: { xs: '100%', md: 'auto' },
      boxSizing: 'border-box',
    }}
  >
    <Avatar sx={{ width: 48, height: 48, backgroundColor: backgroundIconColor }}>{icon}</Avatar>
    <Typography sx={{ fontSize: 32, fontWeight: 600 }}>{count}</Typography>
    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{label}</Typography>
  </Box>
);

export default StatCard;
