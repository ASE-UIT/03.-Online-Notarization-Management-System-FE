import React from 'react';
import { Box, Typography, Badge, IconButton } from '@mui/material';
import { NotificationsRounded } from '@mui/icons-material';
import { black, white, yellow } from '../../../config/theme/themePrimitives';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: white[50], boxShadow: 1 }}>
      <Typography sx={{ flex: 1, color: black[900] }} variant="h6">
        Quản lý công chứng
      </Typography>
      <Badge
        color="primary"
        badgeContent={10}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
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
      </Badge>
    </Box>
  );
};

export default Header;
