import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { white, black,yellow } from '../../../config/theme/themePrimitives';

import { NotificationsRounded } from '@mui/icons-material';


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

        <IconButton
          sx={{
            p: 1,
            backgroundColor: black[50],
            borderRadius: 1,
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: yellow[50],
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
              transform: 'scale(1.05)',
            },
            '&:hover .MuiSvgIcon-root': {
              color: yellow[500],
              transform: 'scale(1.05)',
            },
          }}
        >
          <NotificationsRounded sx={{ fontSize: '1.5rem', color: black[500] }} />
        </IconButton>
      </Box>
    </Box>
    );
};
export default Header;