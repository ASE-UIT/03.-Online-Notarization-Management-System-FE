import React from 'react';
import { Avatar, Typography } from '@mui/material';

const AvatarIcon = ({ email }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', marginRight: '8px' }}>
      <Avatar sx={{ width: 32, height: 32 }}>
        <Typography sx={{ fontSize: 12 }}>{email.charAt(0).toUpperCase()}</Typography>
      </Avatar>
    </div>
  );
};

export default AvatarIcon;
