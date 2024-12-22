import React from 'react';
import { Box, Typography } from '@mui/material';
import { black } from '../../config/theme/themePrimitives';

const InformationField = ({ title, value }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 1 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: black[900], textAlign: 'left' }}>{title}:</Typography>
      <Typography sx={{ flex: 1, fontSize: 12, fontWeight: 400, color: black[500], textAlign: 'right' }}>{value}</Typography>
    </Box>
  );
};

export default InformationField;
