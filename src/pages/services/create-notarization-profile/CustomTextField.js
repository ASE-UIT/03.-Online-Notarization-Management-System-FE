import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { black, red, white } from '../../../config/theme/themePrimitives';

const CustomTextField = ({ label, name, value, placeholder, onChange, required, type }) => {
  const handleInput = (e) => {
    const { value } = e.target;
    if (type === 'number' && value < 0) {
      e.target.value = '';
    }
  };

  const handleWheel = (e) => {
    if (type === 'number') {
      e.target.blur();
    }
  };

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
          '& .MuiOutlinedInput-root': {
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            '&:hover fieldset': {
              borderColor: black[900],
            },
            '&.Mui-focused fieldset': {
              borderColor: black[900],
              borderWidth: 1,
            },
          },
        }}
        onInput={handleInput}
        onWheel={handleWheel}
        value={value}
        onChange={onChange}
        inputProps={{
          style: { fontSize: '0.875rem' },
          placeholder: placeholder,
        }}
        type={type || 'text'}
      />
    </Box>
  );
};

export default CustomTextField;
