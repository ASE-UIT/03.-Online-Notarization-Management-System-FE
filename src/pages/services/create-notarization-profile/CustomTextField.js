import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { black, red, white } from '../../../config/theme/themePrimitives';

const CustomTextField = ({ label, name, value, placeholder, onChange, required }) => {
  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
        {label} {required && <span style={{ color: red[500] }}>*</span>}
      </Typography>
      <TextField
        fullWidth
        name={name}
        variant="outlined"
        sx={{
          backgroundColor: white[50],
          border: `1.2px solid ${black[100]}`,
          '& fieldset': { border: 'none' },
          borderRadius: 1,
        }}
        value={value}
        onChange={onChange}
        inputProps={{
          style: { fontSize: '0.875rem' },
          placeholder: placeholder,
        }}
      />
    </Box>
  );
};

export default CustomTextField;
