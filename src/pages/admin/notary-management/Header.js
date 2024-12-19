import React from 'react';
import { Box, Typography } from '@mui/material';
import { black, white } from '../../../config/theme/themePrimitives';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: white[50], boxShadow: 1 }}>
      <Typography sx={{ flex: 1, color: black[900] }} variant="h6">
        Quản lý công chứng
      </Typography>
    </Box>
  );
};

export default Header;
