import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { black } from '../../../config/theme/themePrimitives';

export default function InfoField({ caption, value }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Typography
        sx={{
          color: black[900],
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        {caption}
      </Typography>
      <TextField
        variant="outlined"
        label={value}
        disabled={true}
        sx={{
          color: black[400],
          fontSize: 16,
          fontWeight: 400,
        }}
      />
    </Box>
  );
}
