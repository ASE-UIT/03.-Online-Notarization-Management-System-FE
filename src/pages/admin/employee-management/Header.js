import React from 'react';
import { Box, Typography } from '@mui/material';
import { white } from '../../../config/theme/themePrimitives';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        gap: '8px',
        backgroundColor: white[50],
      }}
    >
      <Box sx={{ flex: 1, gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Quản lý nhân viên
        </Typography>
      </Box>
    </Box>
  );
};
export default Header;
