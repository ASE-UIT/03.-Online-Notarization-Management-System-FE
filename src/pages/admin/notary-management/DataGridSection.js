import { Box, Typography } from '@mui/material';
import React from 'react';
import { white } from '../../../config/theme/themePrimitives';

const DataGridSection = ({ title, children }) => (
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
    <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>{title}</Typography>
    {children}
  </Box>
);

export default DataGridSection;
