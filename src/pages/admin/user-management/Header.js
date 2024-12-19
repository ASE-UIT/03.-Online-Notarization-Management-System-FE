import React from 'react';
import { Box, Typography } from '@mui/material';
import { white } from '../../../config/theme/themePrimitives';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'fit-content' }}>
      <Box
        sx={{
          display: 'flex',
          p: 3,
          gap: '8px',
          backgroundColor: white[50],
        }}
      >
        <Box sx={{ flex: 1, gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Quản lý người dùng
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Header;
