import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

export default function InfoField({ caption, value, }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        alignSelf: 'stretch',
        flexDirection: 'column',
        flex: '1 0 0',
      }}
    >
      <Typography
        sx={{
          color: '#000',
          fontFeatureSettings: 'liga off, clig off',
          fontFamily: 'Be Vietnam Pro',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        {caption}
      </Typography>
      <TextField
        label={value}
        disabled={true}
        sx={{
          color: '#5C5C5C',
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: '0.15px',
        }}
      ></TextField>
    </Box>
  );
}
