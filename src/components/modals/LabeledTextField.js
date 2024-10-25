import { Box, IconButton, Typography, TextField, InputAdornment, Menu, MenuItem, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { black } from '../../config/theme/themePrimitives';

const LabeledTextField = ({ label, isAutoComplete = false, value = '', onChange, options = [], disabled = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectOption = (option) => {
    onChange(option);
    handleCloseMenu();
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
        gap: '10px',
      }}
    >
      <Typography variant="subtitle2" color={black[900]} fontWeight={500}>
        {label}
      </Typography>

      {isAutoComplete ? (
        <>
          <Autocomplete
            disabled={disabled}
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            options={options.map((option) => option.label)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: black[200],
                    },
                    '&:hover fieldset': {
                      borderColor: black[200],
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: black[500],
                      borderWidth: 1,
                    },
                  },
                }}
              />
            )}
          />
        </>
      ) : (
        <TextField
          variant="outlined"
          size="small"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: black[200],
              },
              '&:hover fieldset': {
                borderColor: black[200],
              },
              '&.Mui-focused fieldset': {
                borderColor: black[500],
                borderWidth: 1,
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default LabeledTextField;
