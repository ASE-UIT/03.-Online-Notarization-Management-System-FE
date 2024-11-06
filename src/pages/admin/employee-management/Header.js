import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { white } from '../../../config/theme/themePrimitives';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


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

        {/* Tra cứu hồ sơ */}
        <IconButton
          sx={{
            display: 'flex',
            p: '6px',
            borderRadius: '8px',
            background: '#FFF7E6',
            height: 'fit-content',
          }}
        >
          <NotificationsNoneIcon sx={{ width: '24px', height: '24px', fill: '#FFAA00' }}></NotificationsNoneIcon>
        </IconButton>
      </Box>
    );
};
export default Header;